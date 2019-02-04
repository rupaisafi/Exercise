using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.StickyEnd
{
    public class StickyEndRepository : IStickyEndRepository
    {
        readonly StickyEndDataService _service = new StickyEndDataService();
        public GridEntity<StickyEndsDetails> GetDetail(GridOptions options, string sID)
        {
            return _service.GetDetail(options, sID);
        }
        public GridEntity<StickyEnds> GetSummary(GridOptions options, string from, string to)
        {
            return _service.GetSummary(options, from, to);
        }
        public StickyEnds SaveStickyEnd(StickyEnds stickyEnd)
        {
            return _service.SaveStickyEnd(stickyEnd);
        }
        public StickyEndsDetails SaveStickyEndDeatils(StickyEndsDetails stickyEndDetail)
        {
            return _service.SaveStickyEndDeatil(stickyEndDetail);
        }
    }
}
