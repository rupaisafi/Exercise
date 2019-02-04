using DBManager;
using Entities.HDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.HDL.StickyEnd
{
    public interface IStickyEndRepository 
    {
        GridEntity<StickyEndsDetails> GetDetail(GridOptions options, string sID);
        GridEntity<StickyEnds> GetSummary(GridOptions options, string from, string to);
                
        StickyEnds SaveStickyEnd(StickyEnds stickyEnd);
        StickyEndsDetails SaveStickyEndDeatils(StickyEndsDetails stickyEndDetail);
    }
}
 