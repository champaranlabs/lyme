const NotificationHandler = require('notifications/notification-handler');

module.exports.perform = ({
  mobile, data, templateId, context
}) => NotificationHandler.send({
  context,
  modes: [
    {
      name: 'sms',
      to: mobile,
      template_id: templateId
    }
  ],
  data
});
