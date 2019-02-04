using System.Data;
using DAL.HDL.DataService;


namespace BLL.HDL.Report
{
    public class ReportService:IReportRepository
    {
        ReportDataService _reportDataService= new ReportDataService();
      
    }
}
