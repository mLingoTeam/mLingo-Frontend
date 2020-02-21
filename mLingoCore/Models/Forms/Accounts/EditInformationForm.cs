using mLingoCore.Models.UserData;

namespace mLingoCore.Models.Forms.Accounts
{
    public class EditInformationForm : UserInformationBase
    {
        public EditInformationForm()
        {
            
        }

        public string Email { get; set; }
    }
}
