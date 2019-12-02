using System.Linq;
using NTextCat;

namespace mLingoCore.Services
{
    /// <summary>
    /// Implementation of Language Detector service, for detecting language in which collection is made
    /// </summary>
    class LanguageDetector : ILanguageDetector
    {
        private readonly RankedLanguageIdentifier mIdentifier;

        public LanguageDetector()
        {
            var factory = new RankedLanguageIdentifierFactory();
            mIdentifier = factory.Load(@".\Assets\LanguageDetectorProfiles\Core14.profile.xml");
        }


        /// <summary>
        /// Detects most certain language based on input string. 
        /// </summary>
        /// <param name="input">String, should be at least 5 words</param>
        /// <returns>ISO639_2T string language code (eg. "EN")</returns>
        public string DetectLanguage(string input)
        {
            var languages = mIdentifier.Identify(input);
            var mostCertainLanguage = languages.FirstOrDefault();
            return mostCertainLanguage != null ? mostCertainLanguage.Item1.Iso639_2T : "unknown";
        }
    }
}
