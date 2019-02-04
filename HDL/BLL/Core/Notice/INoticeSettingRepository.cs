using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.Core.NoticeSetting;

namespace BLL.Core.Notice
{
    public interface INoticeSettingRepository
    {
        List<Entities.Core.NoticeSetting.NoticeInfo> GetNoticeData();
        GridEntity<Entities.Core.NoticeSetting.NoticeInfo> GetNoticeSummary(GridOptions options);
        NoticeInfo SaveNoticeInfo(NoticeInfo objNotice, Entities.HDL.User user);
    }
}
