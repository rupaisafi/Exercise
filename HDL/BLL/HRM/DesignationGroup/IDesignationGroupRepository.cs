using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HRM;

namespace BLL.HRM.DesignationGroup
{
    public interface IDesignationGroupRepository
    {
        string SaveDesignationGroup(Common_DesignationGroup objDesignationGroup);
        GridEntity<Common_DesignationGroup> GetDesignationGroupSummary(GridOptions options);
        List<Common_DesignationGroup> GetAllDesignationGroup();
    }
}
