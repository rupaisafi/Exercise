using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HRM;

namespace BLL.HRM.Company
{
    public interface ICompanyRepository
    {
        string SaveCompany(Common_Company objCompany);
        GridEntity<Common_Company> GetCompanySummary(GridOptions options);
        List<Common_Company> GetAllCompany();
    }
}
