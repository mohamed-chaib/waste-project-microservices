from django.core.mail import send_mail
from django.conf import settings

def send_confirmation_email(to_email: str):
    try:
        subject = "🎉 Welcome to our SmartRecycle platform"
        message = """
        Hello 👋

        Your registration was successful 🎉

        Welcome aboard!
        """

        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[to_email],
            fail_silently=False,
        )

        print(f" Email sent to {to_email}")
        return True

    except Exception as e:
        print(" Email sending failed:", repr(e))
        return False