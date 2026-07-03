namespace IRControl.Application.Common;

public class Result
{
    public bool Success { get; protected set; }

    public Error? Error { get; protected set; }

    public static Result Ok()
    {
        return new Result
        {
            Success = true
        };
    }

    public static Result Fail(
        string code,
        string message)
    {
        return new Result
        {
            Success = false,
            Error = new Error
            {
                Code = code,
                Message = message
            }
        };
    }
}