const NotificationHandler = require('notifications/notification-handler');

module.exports.perform = ({
  email, context, data, attachments = null
}) => NotificationHandler.send({
  context,
  modes: [
    {
      name: 'email',
      to: email
    }
  ],
  data,
  attachments
});
