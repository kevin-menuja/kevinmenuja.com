"""Original, deterministic ambient loop; no third-party recordings or melodies."""
import math, wave, array, pathlib
RATE=24000
BEAT=60/64
BAR=4*BEAT
CHORDS=[(50,57,61,64,66),(47,54,57,62,66),(43,50,54,57,59),(45,52,57,59,64),
        (50,57,61,64,69),(47,54,57,62,64),(43,50,54,59,62),(45,52,57,61,64),
        (54,57,62,64,69),(47,54,57,62,66),(43,50,54,57,62),(45,52,57,59,64),
        (50,57,61,64,66),(47,54,57,62,69),(43,50,54,57,59),(45,52,57,59,64)]
N=round(RATE*BAR*len(CHORDS))
signal=array.array('f',[0])*N
tau=math.tau
def note(midi,start,duration,amp,pad=False):
    f=440*2**((midi-69)/12)
    count=round(duration*RATE)
    origin=round(start*RATE)
    attack=0.9 if pad else 0.055
    release=1.4 if pad else 0.65
    for i in range(count):
        t=i/RATE
        env=min(1,t/attack,max(0,(duration-t)/release))
        env=env*env*(3-2*env)
        p=t*tau*f
        if pad:
            v=(math.sin(p)+.18*math.sin(2*p)+.07*math.sin(3*p))*(.92+.08*math.sin(tau*.19*t+midi))
        else:
            v=(math.sin(p)+.26*math.sin(2*p)*math.exp(-1.6*t)+.09*math.sin(3*p)*math.exp(-3*t))*math.exp(-.8*t)
        signal[(origin+i)%N]+=amp*env*v
for i,chord in enumerate(CHORDS):
    t=i*BAR
    for j,m in enumerate(chord):
        note(m,t-.4,BAR+1.15,.046 if j==0 else .025,True)
    for j,m in enumerate([chord[2]+12,chord[3]+12,chord[4]+12]):
        note(m,t+BEAT*(.5+j*1.2),BEAT*2.4,.055 if j==0 else .04)
# Circular echoes retain tails across the loop boundary.
dry=signal[:]
for delay,gain in [(0.27,.19),(.53,.11),(.83,.06)]:
    shift=round(delay*RATE)
    for i in range(N):signal[i]+=gain*dry[(i-shift)%N]
peak=max(abs(x) for x in signal)
# Conservative fixed intrinsic loudness, including browsers ignoring media.volume.
gain=.105/peak
pcm=array.array('h',(round(x*gain*32767) for x in signal))
out=pathlib.Path('/tmp/km-portfolio-ambient.wav')
with wave.open(str(out),'wb') as f:
    f.setnchannels(1);f.setsampwidth(2);f.setframerate(RATE);f.writeframes(pcm.tobytes())
print('Original ambient loop:',N/RATE,'seconds; PCM peak',20*math.log10(.105),'dBFS')
