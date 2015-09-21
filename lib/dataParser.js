var issueFields = [
  'key',
  'typeName',
  'typeUrl',
  'priorityName',
  'priorityUrl',
  'assignee',
  'assigneeName',
  'autoUserAvatar',
  'avatarUrl',
  'hasCustomUserAvatar',
  'statusId',
  'statusName'
  ];
  var columnFields = ['name','statusIds','max'];

  var formatRawData = function(data,fields){
    var result = data.map(function(rawEntry,index){
        var formattedEntry = {};
        var fieldKey;

        for (var i = 0; i < fields.length; i++) {
          fieldKey = fields[i];
          formattedEntry[fieldKey] = (rawEntry[fieldKey] !== null && typeof rawEntry[fieldKey] !== 'undefined') ? rawEntry[fieldKey] : '';
        }

        return formattedEntry;
      });
    return result;

  };

  module.exports.formatJiraResponse = function(jiraReponse){
    //console.log(jiraReponse.columnsData.columns);
    var columns = formatRawData(jiraReponse.columnsData.columns,columnFields);
    var issues = formatRawData(jiraReponse.issuesData.issues,issueFields);
    var formattedColumns = columns.map(function(column,index){
      var columnIssues = issues.filter(function(issue){
          issue.columnName = getColumnNameForIssue(columns,issue);
          console.log(issue.columnName);
          return issue.columnName === column.name;
        });

      return {
        name: column.name,
        issues : columnIssues,
        issuesCount: columnIssues.length,
        max: column.max === '' ? '∞' : column.max
      }
    });


      //formattedColumns[column.name].count = formattedColumns[column.name].issues.length;

    //})

    return formattedColumns
  };

  function getColumnNameForIssue(columns,issue){
    var i,column;
    for (i = 0, j = columns.length;i < j;i++) {
      column = columns[i];
      if (column.statusIds.indexOf(issue.statusId) > -1)
      return column.name;
    }
    return "Column not found";
  }
