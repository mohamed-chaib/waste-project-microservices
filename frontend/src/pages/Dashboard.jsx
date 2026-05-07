import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { Upload, Trash2, CheckCircle, Info, Loader2, ArrowRight, History, Camera, CameraOff, Video } from 'lucide-react';
import Webcam from 'react-webcam';
import Navbar from '../components/Navbar';
import '../App.css';

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const webcamRef = React.useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLive(false); // Disable live if user uploads manually
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
      setRecommendations(null);
      setError(null);
    }
  };

  const handleAnalyze = async (fileToUse = null) => {
    // If fileToUse is an event (from onClick), ignore it and use selectedFile
    const isFile = fileToUse instanceof File || fileToUse instanceof Blob;
    const activeFile = isFile ? fileToUse : selectedFile;
    
    if (!activeFile) return;

    if (!isFile) setLoading(true); // Don't show full loader for live mode
    setError(null);

    const token = localStorage.getItem('access_token');
    const formData = new FormData();
    formData.append('image', activeFile);

    try {
      // 1. Call AI Service via Gateway
      const aiResponse = await fetch('http://localhost/api/ai/upload/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!aiResponse.ok) {
        if (aiResponse.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          navigate('/login?expired=true');
          return;
        }
        const responseText = await aiResponse.text();
        let errorMessage = 'Failed to analyze image.';
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorData.detail || responseText || errorMessage;
        } catch (e) {
          errorMessage = `Failed to analyze image. Server response: ${responseText}`;
        }
        throw new Error(errorMessage);
      }

      const aiData = await aiResponse.json();

      setAnalysisResult(aiData);

      // 2. Fetch Recommendations based on waste_type
      if (aiData.waste_type && aiData.waste_type !== 'No object detected') {
        const recResponse = await fetch(`http://localhost/api/recommendations/${aiData.waste_type}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (recResponse.ok) {
          const recData = await recResponse.json();
          setRecommendations(recData);
        }
      }
    } catch (err) {
      if (!isFile) setError(err.message);
    } finally {
      if (!isFile) setLoading(false);
    }
  };

  const captureFrame = async () => {
    if (webcamRef.current && isLive) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const res = await fetch(imageSrc);
        const blob = await res.blob();
        const file = new File([blob], "frame.jpg", { type: "image/jpeg" });
        await handleAnalyze(file);
      }
    }
  };

  useEffect(() => {
    let interval;
    if (isLive) {
      interval = setInterval(() => {
        captureFrame();
      }, 3000); // Analyze every 3 seconds for stability
    }
    return () => clearInterval(interval);
  }, [isLive]);

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    setRecommendations(null);
    setError(null);
  };

  const canvasRef = React.useRef(null);

  const drawBoxes = () => {
    const canvas = canvasRef.current;
    if (!canvas || !analysisResult?.detections || !isLive) return;
    
    const ctx = canvas.getContext('2d');
    const webcam = webcamRef.current.video;
    
    // Match canvas size to video display size
    canvas.width = webcam.videoWidth;
    canvas.height = webcam.videoHeight;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    analysisResult.detections.forEach(det => {
      const [x1, y1, x2, y2] = det.box;
      const label = det.label;
      const conf = det.confidence;
      
      // Drawing styles
      ctx.strokeStyle = '#2bd873';
      ctx.lineWidth = 4;
      ctx.fillStyle = '#2bd873';
      ctx.font = 'bold 16px Outfit, sans-serif';
      
      // Scale coordinates if necessary (Webcam captures at full res, display might be scaled)
      // Here we assume detections match the frame we sent.
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
      
      // Draw Label Background
      const text = `${label} ${(conf * 100).toFixed(0)}%`;
      const textWidth = ctx.measureText(text).width;
      ctx.fillRect(x1, y1 - 25, textWidth + 10, 25);
      
      // Draw Text
      ctx.fillStyle = '#0b301a';
      ctx.fillText(text, x1 + 5, y1 - 7);
    });
  };

  useEffect(() => {
    if (isLive && analysisResult) {
      drawBoxes();
    }
  }, [analysisResult, isLive]);

  return (
    <div className="min-h-screen bg-[#050a06] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Side: Upload Section */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#2bd873] to-[#1a4d2e] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-8 bg-[#0a110b] border border-white/10 rounded-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 text-[#2bd873]" style={{ fontFamily: 'Outfit, sans-serif' }}>Waste Analyzer</h1>
                    <p className="text-white/60 text-sm">Get instant recycling guidance powered by AI.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsLive(!isLive);
                      handleReset();
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${isLive ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-[#2bd873]/10 text-[#2bd873] border border-[#2bd873]/20 hover:bg-[#2bd873]/20'}`}
                  >
                    {isLive ? <><CameraOff className="w-4 h-4" /> Stop Live</> : <><Camera className="w-4 h-4" /> Go Live</>}
                  </button>
                </div>
                
                {isLive ? (
                  <div className="relative rounded-xl overflow-hidden border-2 border-[#2bd873]/30 shadow-[0_0_20px_rgba(43,216,115,0.1)] aspect-video bg-black">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="w-full h-full object-cover"
                      videoConstraints={{ facingMode: "environment" }}
                    />
                    <canvas 
                      ref={canvasRef}
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-red-500 rounded-full animate-pulse z-10">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest">Live Scanning</span>
                    </div>
                  </div>
                ) : !previewUrl ? (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-[#2bd873]/50 hover:bg-[#2bd873]/5 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 text-[#2bd873] mb-4 opacity-70" />
                      <p className="mb-2 text-sm text-gray-400 font-semibold">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                      <img 
                        src={analysisResult?.predicted_image || previewUrl} 
                        alt="Preview" 
                        className={`w-full ${analysisResult ? 'h-[500px]' : 'h-80'} object-contain bg-black/40 transition-all duration-500`} 
                      />
                      {analysisResult?.predicted_image && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-[#2bd873] text-[#0b301a] text-[10px] font-bold rounded uppercase tracking-wider">
                          AI Processed
                        </div>
                      )}
                      <button 
                        onClick={handleReset}
                        className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-full transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    
                    <button
                      onClick={handleAnalyze}
                      disabled={loading}
                      className="w-full py-4 bg-[#2bd873] text-[#0b301a] font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#2bd873]/20 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Start Analysis <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                )}

                {error && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Results Section */}
          <div className="w-full lg:w-1/2">
            {!analysisResult && !loading ? (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center border border-white/5 bg-white/[0.02] rounded-2xl">
                <div className="w-20 h-20 rounded-full bg-[#2bd873]/5 flex items-center justify-center mb-6">
                  <History className="w-10 h-10 text-[#2bd873] opacity-20" />
                </div>
                <h3 className="text-xl font-semibold text-white/40">Ready to Analyze</h3>
                <p className="text-white/20 mt-2">Upload an image to see results here.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* AI Classification Card */}
                {analysisResult && (
                  <div className="p-6 bg-[#0a110b] border border-white/10 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-blue-400" />
                      </div>
                      <h2 className="text-xl font-bold">AI Analysis Result</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Primary Match</p>
                        <p className="text-2xl font-bold text-[#2bd873] capitalize">{analysisResult.waste_type}</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Confidence Score</p>
                        <p className="text-2xl font-bold text-white">{(analysisResult.confidence * 100).toFixed(1)}%</p>
                      </div>
                    </div>

                    {analysisResult.detections && analysisResult.detections.length > 0 && (
                      <div className="mt-6 space-y-3">
                        <p className="text-xs text-white/40 uppercase tracking-wider">Detected Objects Breakdown</p>
                        <div className="space-y-2">
                          {analysisResult.detections.map((det, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-[#2bd873]/30 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#2bd873]/20 flex items-center justify-center text-[10px] font-bold text-[#2bd873]">
                                  {idx + 1}
                                </div>
                                <span className="font-medium text-sm capitalize">{det.label}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-[#2bd873]" 
                                    style={{ width: `${(det.confidence * 100)}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs font-mono text-white/60">{(det.confidence * 100).toFixed(1)}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Recommendations Card */}
                {recommendations && (
                  <div className="p-6 bg-[#0a110b] border border-white/10 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#2bd873]/10 rounded-lg">
                        <Info className="w-6 h-6 text-[#2bd873]" />
                      </div>
                      <h2 className="text-xl font-bold">Recycling Tips</h2>
                    </div>

                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-4 ${recommendations.is_recyclable ? 'bg-green-500/10 border border-green-500/20' : 'bg-orange-500/10 border border-orange-500/20'}`}>
                      <div className={`w-3 h-3 rounded-full animate-pulse ${recommendations.is_recyclable ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                      <p className="font-medium">
                        Status: <span className={recommendations.is_recyclable ? 'text-green-400' : 'text-orange-400'}>
                          {recommendations.is_recyclable ? 'Highly Recyclable' : 'Not Recyclable'}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-sm leading-relaxed text-white/80 italic">
                          "{recommendations.tips}"
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {loading && !analysisResult && (
                  <div className="flex flex-col items-center justify-center p-20 animate-pulse">
                    <Loader2 className="w-12 h-12 text-[#2bd873] animate-spin mb-4" />
                    <p className="text-white/40">Our AI is processing your request...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
