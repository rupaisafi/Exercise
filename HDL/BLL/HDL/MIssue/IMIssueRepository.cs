using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.MIssue
{
    public interface IMIssueRepository
    {
        MIssueInfo SaveMIssueInfo(MIssueInfo objMIssue, List<MIssueDetails> objMIssueDetails);
        GridEntity<MIssueInfo> GetMIssueInfoSummary(GridOptions options, string dateFrom, string dateTo);
        List<MIssueDetails> GetAllGridData(string missueId);
    }
}
