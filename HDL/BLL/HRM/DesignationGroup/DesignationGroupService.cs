using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HRM;
using BLL.HRM.DesignationGroup;
using DAL.HRM;

namespace BLL.HRM.DesignationGroup
{
    public class DesignationGroupService : IDesignationGroupRepository
    {
        readonly DesignationGroupDataService _DesignationGroupDataService = new DesignationGroupDataService();
        public string SaveDesignationGroup(Common_DesignationGroup objDesignationGroup)
        {
            return _DesignationGroupDataService.SaveDesignationGroup(objDesignationGroup);
        }

        public GridEntity<Common_DesignationGroup> GetDesignationGroupSummary(GridOptions options)
        {
            return _DesignationGroupDataService.GetDesignationGroupSummary(options);
        }

        public List<Common_DesignationGroup> GetAllDesignationGroup()
        {
            return _DesignationGroupDataService.GetAllDesignationGroup();
        }
    }
}