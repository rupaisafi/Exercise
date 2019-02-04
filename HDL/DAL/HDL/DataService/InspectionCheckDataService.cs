using DAL.Common;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.HDL.DataService
{
    public class InspectionCheckDataService
    {
        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SqlConnectionString"].ConnectionString;
        readonly CommonDataService _service = new CommonDataService();
        public List<InspectionCheckRejectionToFinish> GetAllInspectionCheckRejectionToFinish()
        {
            return _service.Select_Data_List<InspectionCheckRejectionToFinish>("SP_SELECT_INSPECTION_CHECK_PRODUCTION_REJECTION_INFO", "GET_ALL_PRODUCTION_TO_FINISH");
        }
        public List<InspectionCheckProductionToFinish> GetAllInspectionCheckProductionToFinish()
        {
            return _service.Select_Data_List<InspectionCheckProductionToFinish>("SP_SELECT_INSPECTION_CHECK_PRODUCTION_REJECTION_INFO", "GET_ALL_REJECTION_TO_FINISH");
        }
    }
}
