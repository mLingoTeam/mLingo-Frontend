using System.Linq;
using mLingoCore.Services;
using NTextCat;

namespace mLingo.Modules
{
    /// <summary>
    /// Implementation of Language Detector service, for detecting language in which collection is made
    /// </summary>
    class LanguageDetector : ILanguageDetector
    {
        private readonly RankedLanguageIdentifier Identifier;

        public LanguageDetector()
        {
            var factory = new RankedLanguageIdentifierFactory();
            Identifier = factory.Load(@".\Assets\LanguageDetectorProfiles\Core14.profile.xml");
        }


        /// <summary>
        /// Detects most certain language based on input string. 
        /// </summary>
        /// <param name="input">String, should be at least 5 words</param>
        /// <returns>ISO639_2T string language code Iso639_2T standardized (eg. "EN")</returns>
        public string DetectLanguage(string input)
        {
            if (input.Split(' ').Length < 5) return "NA";

            var languages = Identifier.Identify(input);
            var mostCertainLanguage = languages.FirstOrDefault();
            return mostCertainLanguage != null ? mostCertainLanguage.Item1.Iso639_2T : "NA";
        }
    }
}
