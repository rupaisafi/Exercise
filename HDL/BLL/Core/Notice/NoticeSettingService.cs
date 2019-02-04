using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Core;
using DBManager;
using Entities.Core.NoticeSetting;

namespace BLL.Core.Notice
{
   public class NoticeSettingService:INoticeSettingRepository
    {
       readonly NoticeSettingDataService _noticeSettingDataService = new NoticeSettingDataService();
       public List<NoticeInfo> GetNoticeData()
       {
           return _noticeSettingDataService.GetNoticeData();
       }

       public GridEntity<NoticeInfo> GetNoticeSummary(GridOptions options)
       {
           return _noticeSettingDataService.GetNoticeSummary(options);
       }

       public NoticeInfo SaveNoticeInfo(NoticeInfo objNotice, Entities.HDL.User user)
       {
           return _noticeSettingDataService.SaveNoticeInfo(objNotice,user);
       }
    }
}
