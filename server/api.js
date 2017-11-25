import { Picker } from 'meteor/meteorhacks:picker';

if (process.env.NODE_ENV === 'development') {
  console.log('[development] Starting API for dev.');
  Picker.route('/data/:id', function(params, req, res, next) {
    const { team, users, channels, groups } = Bots[params.id]
    res.end(JSON.stringify({
      team, users, channels, groups
    }, null, 2));
  });
}
