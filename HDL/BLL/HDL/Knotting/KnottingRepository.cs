using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HDL;
using DAL.HDL.DataService;

namespace BLL.HDL.Knotting
{
    public class KnottingRepository : IKnottingRepository
    {
        private readonly KonttingDataService _service;

        /// <summary>
        /// Default Constructor
        /// </summary>
        /// <param name="service"></param>
        public KnottingRepository()
        {
            _service = new KonttingDataService();
        }
        /// <summary>
        /// Constructor with parameter
        /// </summary>
        /// <param name="service"></param>
        public KnottingRepository(KonttingDataService service)
        {
            _service = service;
        }

        public KnottingMaster SaveData(KnottingMaster master, KnottingDetail detail)
        {
            return _service.SaveData(master,detail);
        }
        public GridEntity<KnottingDetail> GetDetail(GridOptions options, string masterId)
        {
            return _service.GetDetail(options, masterId);
        }
        public GridEntity<KnottingMaster> GetSummary(GridOptions options, string fromDate, string toDate)
        {
            return _service.GetSummary(options,fromDate,toDate);
        }
        
    }
}
