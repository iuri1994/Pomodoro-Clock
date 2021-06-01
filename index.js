




document.addEventListener("DOMContentLoaded", (event)  => {
    var break_time = 1;
    var work_time = 1;
    var current_time = 1*60;
    var begin = true
    var work = true

    var format_time = (time) => {
        if (time >= 10) {
            return time;
        } else {
            return '0' + time;
        }
    }

    var format_time_sec = (time_sec) => {
        var minutes = Math.floor(time_sec / 60);
        var seconds = time_sec - minutes * 60;
        return format_time(minutes) + ':' + format_time(seconds)
    }

    var fill_fields = () => {
        document.getElementById('counter').innerText = format_time_sec(work_time*60);
        document.getElementById('work_break').innerText = 'WORK';
        document.getElementsByClassName('time_pomadoro')[0].getElementsByTagName('span')[0].innerText = format_time(work_time);
        document.getElementsByClassName('break_time_pomadoro')[0].getElementsByTagName('span')[0].innerText = format_time(break_time);
    }
    
    var manage_fields = () => {
        document.getElementById('stop').style='display:none';
    }

    var button_manage = () => {
        var clock = null

        var clone = (value) => {
            return value
        }

        var clock_function = () => {
            current_time -= 1
            if (current_time == -1) {
                if (work) {
                    work = false;
                    current_time = clone(break_time)*60;
                    document.getElementById('work_break').innerText = 'BREAK';
                } else {
                    work = true;
                    current_time = clone(work_time)*60;
                    document.getElementById('work_break').innerText = 'WORK';
                }
            }
            document.getElementById('counter').innerText = format_time_sec(current_time);
        }

        document.getElementById('play').onclick = () => {
            document.getElementById('stop').style='display:inline';
            document.getElementById('play').style='display:none';
            if (begin) {
                current_time = clone(work_time)*60;
                begin = false;
                document.getElementById('counter').innerText = format_time_sec(current_time);
            }
            clock = setInterval(clock_function, 1000);

        };

        document.getElementById('stop').onclick = () => {
            document.getElementById('play').style='display:inline';
            document.getElementById('stop').style='display:none';
            clearInterval(clock)
        };

        document.getElementById('reset').onclick = () => {
            current_time = clone(work_time) * 60
            document.getElementById('counter').innerText = format_time_sec(current_time);
            document.getElementById('work_break').innerText = 'WORK';
            begin = true;
            work = true;
            clearInterval(clock);
            document.getElementById('stop').style='display:none';
            document.getElementById('play').style='display:inline';
        };
        
        document.getElementById('work_time_plus').onclick = () => {
            work_time += 1
            if (work_time > 99 ) {
                work_time = 99
            }
            document.getElementsByClassName('time_pomadoro')[0].getElementsByTagName('span')[0].innerText = format_time(work_time);
        };

        document.getElementById('work_time_minus').onclick = () => {
            work_time -= 1
            if (work_time < 1 ) {
                work_time = 1
            }
            document.getElementsByClassName('time_pomadoro')[0].getElementsByTagName('span')[0].innerText = format_time(work_time);
        };

        document.getElementById('break_time_plus').onclick = () => {
            break_time += 1
            if (break_time > 99 ) {
                break_time = 99
            }
            document.getElementsByClassName('break_time')[0].getElementsByTagName('span')[0].innerText = format_time(break_time);
        };

        document.getElementById('break_time_minus').onclick = () => {
            break_time -= 1
            if (break_time < 1 ) {
                break_time = 1
            }
            document.getElementsByClassName('break_time')[0].getElementsByTagName('span')[0].innerText = format_time(break_time);
        };
    }
    
    fill_fields();
    manage_fields();
    button_manage();
});