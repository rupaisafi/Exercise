using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.Core.Menu;

namespace BLL.Core.Menu
{
    public interface IMenuRepository
    {
        string SaveMenu(Entities.Core.Menu.Menu menu);
        GridEntity<Entities.Core.Menu.Menu> GetMenuSummary(GridOptions options);
        List<Entities.Core.Menu.Menu> SelectAllMenuByModuleId(int moduleId);
        List<Entities.Core.Menu.Menu> SelectAllMenu();
        string UpdateMenuSorting(List<Entities.Core.Menu.Menu> menuList, Entities.HDL.User user);
        List<Entities.Core.Menu.Menu> SelectMenuByUserPermission(string userId);
        GridEntity<MenuPermission> GetMenuPermissionSummary(GridOptions options, string usrid);
    }
}
