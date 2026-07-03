namespace IRControl.Application.Common;

public class Result<T> : Result
{
    public T? Data { get; private set; }

    public static Result<T> Ok(T data)
    {
        return new Result<T>
        {
            Success = true,
            Data = data
        };
    }

    public new static Result<T> Fail(
        string code,
        string message)
    {
        return new Result<T>
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