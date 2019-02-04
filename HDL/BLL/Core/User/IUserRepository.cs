using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.Core.Menu;

namespace BLL.Core.User
{
   public interface IUserRepository
    {
       List<Entities.HDL.User> GetUserList();
       GridEntity<Entities.HDL.User> GetUserSummary(GridOptions options, string usrId);
       string SaveUserPermission(MenuPermission usrObj, List<MenuPermission> objUserMenuList, List<MenuPermission> objRemovedMenuList);
       string  ChangePassword(string curpassword, string newpassword, string usrid, string usrsname);
       Entities.HDL.User GetUserInfoById(string usrid);
    }
}
