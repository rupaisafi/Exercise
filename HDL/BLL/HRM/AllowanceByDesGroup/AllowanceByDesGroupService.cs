using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HRM;
using BLL.HRM.AllowanceByDesGroup;
using DAL.HRM;

namespace BLL.HRM.AllowanceByDesGroup
{
    public class AllowanceByDesGroupService : IAllowanceByDesGroupRepository
    {
        readonly AllowanceByDesGroupDataService _AllowanceByDesGroupDataService = new AllowanceByDesGroupDataService();
        public string SaveAllowanceByDesGroup(Payroll_AllowanceByDesGroup objAllowanceByDesGroup)
        {
            return _AllowanceByDesGroupDataService.SaveAllowanceByDesGroup(objAllowanceByDesGroup);
        }

        public GridEntity<Payroll_AllowanceByDesGroup> GetAllowanceByDesGroupSummary(GridOptions options)
        {
            return _AllowanceByDesGroupDataService.GetAllowanceByDesGroupSummary(options);
        }

        public List<Payroll_AllowanceByDesGroup> GetAllAllowanceByDesGroup()
        {
            return _AllowanceByDesGroupDataService.GetAllAllowanceByDesGroup();
        }
    }
}