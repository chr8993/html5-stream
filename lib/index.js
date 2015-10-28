var spawn = require('child_process').spawn;
var fs    = require('fs');

module.exports = {
    show: function(env, opts) {
        if(!opts.input) {
           console.log("Error: ");
           console.log("No input specified");
           return;
        }
        var r = ['-i', opts.input, '-vcodec',
        'copy', '-f', 'mp4', '-reset_timestamps',
        '1', '-movflags', 'frag_keyframe+empty_moov', '-'];
        var c = spawn("ffmpeg", r, {detached: false});
        var bffer = "";
        c.stdout.on('data', function(buffer) {
           bffer += String(buffer);
           console.log(String(buffer));
        });
        c.on('close', function() {
            fs.writeFile('video_new.mp4', bffer, function(err) {
              if(err) throw err;
              console.log("Finished!");
            })
        });
    }
};
