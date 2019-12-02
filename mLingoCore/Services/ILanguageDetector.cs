namespace mLingoCore.Services
{
    /// <summary>
    /// Defines Language Detector service
    /// </summary>
    public interface ILanguageDetector
    {
        string DetectLanguage(string input);
    }
}
