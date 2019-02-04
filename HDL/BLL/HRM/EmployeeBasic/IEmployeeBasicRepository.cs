using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HRM;

namespace BLL.HRM.EmployeeBasic
{
    public interface IEmployeeBasicRepository
    {
        GridEntity<EmployeeAllInformation> GetEmployeeInfoSummary(GridOptions options);
        HumanResource_EmployeeBasic Save(HumanResource_EmployeeBasic objEmployeeBasic,
            List<HumanResource_EmployeeEducation> objEducation, HumanResource_EmployeeContact objContact,
            HumanResource_EmployeePassport objPassport, HumanResource_EmployeeDrivingLicense objDrivingLicense);
        List<TreeItem> GetEmployeeTreeResult();
        GridEntity<EmployeeAllInformation> GetEmployeeSummary(GridOptions options, List<TreeItem> treelist, string searchKey, int status);
    }
}
