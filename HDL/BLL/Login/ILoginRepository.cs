using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HDL;

namespace BLL.Login
{
    public interface ILoginRepository
    {
        User ValidateUserLogin(string loginId, string password,string terminalId);
    }
}
