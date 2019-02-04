<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReportViewerRDLC.aspx.cs" Inherits="HDLERP.Reports.ReportViewerRDLC" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>




<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
      <link href="../Images/pblLogo3.jpg" rel="shortcut icon" type="image/x-icon" />
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
            <rsweb:ReportViewer ID="RdlcReportViewer" runat="server" Width="100%" Height="618px" ShowRefreshButton="False" Font-Names="Verdana" Font-Size="8pt" ProcessingMode="Remote" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt"><localreport reportpath="Reports\Report1.rdlc"></localreport></rsweb:ReportViewer>
        </div>
    </form>
</body>
</html>
