from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse


def get_client_ip(request: Request) -> str:
    """
    Get client IP address, accounting for proxies.
    Checks X-Forwarded-For header first (for proxies like Render, Vercel).
    """
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        # X-Forwarded-For can contain multiple IPs, take the first one
        return forwarded.split(",")[0].strip()
    
    # Fallback to direct connection IP
    return request.client.host if request.client else "unknown"


# Create limiter instance
limiter = Limiter(
    key_func=get_client_ip,
    default_limits=["100 per hour"],  # Global limit:  100 requests per hour per IP
    storage_uri="memory://",  # Use in-memory storage (simple, works for single instance)
    headers_enabled=True  # Add rate limit headers to responses
)


def rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded) -> JSONResponse:
    """
    Custom error handler for rate limit exceeded.
    Returns a friendly JSON response instead of generic error.
    """
    return JSONResponse(
        status_code=429,
        content={
            "error": "Rate limit exceeded",
            "message": "Too many requests.  Please try again later.",
            "detail": f"You have exceeded the rate limit. Please wait before making more requests.",
            "retry_after": exc.detail if hasattr(exc, 'detail') else "Please wait a moment"
        }
    )