using System.Linq;
using NTextCat;

namespace mLingoCore.Services
{
    class LanguageDetector : ILanguageDetector
    {
        private readonly RankedLanguageIdentifier mIdentifier;
        public LanguageDetector()
        {
            var factory = new RankedLanguageIdentifierFactory();
            mIdentifier = factory.Load(@".\Assets\LanguageDetectorProfiles\Core14.profile.xml");
        }

        public string DetectLanguage(string input)
        {
            var languages = mIdentifier.Identify(input);
            var mostCertainLanguage = languages.FirstOrDefault();
            return mostCertainLanguage != null ? mostCertainLanguage.Item1.Iso639_2T : "unknown";
        }
    }
}
