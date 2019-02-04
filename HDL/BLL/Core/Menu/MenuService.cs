using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Core;
using DBManager;
using Entities.Core.Menu;

namespace BLL.Core.Menu
{
    public class MenuService:IMenuRepository
    {
        readonly MenuDataService _menuDataService = new MenuDataService();
        public string SaveMenu(Entities.Core.Menu.Menu menu)
        {
            return _menuDataService.SaveMenu(menu);
        }

        public GridEntity<Entities.Core.Menu.Menu> GetMenuSummary(GridOptions options)
        {
            return _menuDataService.GetMenuSummary(options);
        }

        public List<Entities.Core.Menu.Menu> SelectAllMenuByModuleId(int moduleId)
        {
            return _menuDataService.SelectAllMenuByModuleId(moduleId);
        }

        public List<Entities.Core.Menu.Menu> SelectAllMenu()
        {
            return _menuDataService.SelectAllMenu();
        }

        public string UpdateMenuSorting(List<Entities.Core.Menu.Menu> menuList, Entities.HDL.User user)
        {
            return _menuDataService.UpdateMenuSorting(menuList,user);
        }
        public List<Entities.Core.Menu.Menu> SelectMenuByUserPermission(string userId)
        {
            return _menuDataService.SelectMenuByUserPermission(userId);
        }

        public GridEntity<MenuPermission> GetMenuPermissionSummary(GridOptions options, string usrid)
        {
            return _menuDataService.GetMenuPermissionSummary(options, usrid);
        }
    }
}
