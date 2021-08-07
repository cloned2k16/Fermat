/*
    Copyright (c) 2021 , Paolo Lioy

    bla blabla blablabla ..
*/ 
var 	z,zX,zY
    ,	max 		
	,   cX,cY
	,   zoomX   	
	,   zoomY
	;

const   ND      				= 	undefined
    ,   FN                      =   Function.apply
    ,   round2                  =   (n)             =>  { return Math.round(( n + Number.EPSILON) * 100) / 100;                     }
    ,   _log                    =   function ()         { FN.call(console.log  , console, arguments);                               }
    ,   _err                    =   function ()         { FN.call(console.error, console, arguments);                               }
    ,   url     = new URL(window.location)
    ,   query   = window.location.search.substring(1)
    ,   gfx     = document.getElementById('display')
    ,   getEl   = ( id )                            => {
            let     d=document
                ,   e=d.getElementById(id)
                ;
                return {
					el 		: e
				 ,	floatV 	: () => { return parseFloat(el.value.replace(',','.')) }
				 ,	intV   	: () => { return parseInt(el) }
                }
        }
    ,   param   = ( nm )                            => {
        return url.searchParams.get(nm);
    }
    ,   paramF  = ( nm )                            => {
        if (param(nm)==ND) return ND; else return parseFloat(param(nm).replace(',','.'));
    }
    ,   ctx     	= gfx.getContext('2d')
    ,   width   	= gfx.width
    ,   height  	= gfx.height
	,	R           = 1
    ,   PI      	= Math.PI
    ,   PI2     	= 2*PI
 	, 	defStrokeC	= '#22a39377'
    ,   line    = (x,y,x1,y1,strokeC)               => {
                    x =cX+(  x)*zoomX
                    y =cY+R*zoomY-y*zoomY
                    x1 =cX+(x1)*zoomX
                    y1 =cY+R*zoomY-y1*zoomY
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    if ( ND != strokeC ){
                        //defStrokeC      =
                        ctx.strokeStyle = strokeC ;
                    }
                    else {
                        ctx.strokeStyle = defStrokeC ;
                    }
                    ctx.moveTo(x,y);
                    ctx.lineTo(x1,y1);
                    ctx.stroke();
        }
	,	box     = (x,y,c)							=> {
			 let k=x-1;
			 line( k, y  , x, y  ,c); // left
			 line( x, y  , x, y+x,c); // up
			 //_log(x,y);;
			 if (y+x>=k*k)
				line( x, y+x, 0, y+x,'#44eeaa55'); // right
			 line( 0, y+x, 0, y  ,c); // dn
		
	}
	,   plot	= (n,c) => {
		    if (n==ND) return;
			let nb
			,	isOdd = n & 1;
			for (nb=0; nb<n; nb++){
				let x=n
				box(x,x*nb,c)
			}
			
		}			
	,   plotA	= (n) => {
		    if (n==ND) return;
			
			for (nb=0; nb<n; nb++){
				let x=n
				box(x,x*nb);
			}
			
		}			
	;

    zX          = paramF('zoomX')
	zY          = paramF('zoomY')
	zoomX       = zX || 10
    zoomY   	= zY || Math.pow(zoomX,1/10)/2
    cX      	= 203
    cY      	= height -zoomX
	max         = paramF('max') || 200
	
	ctx.font = "24px Georgia";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText('Fermat last for ^3', 7,100);
	ctx.font = "12px System";
    ctx.textAlign = "left";
    ctx.fillText('zoom X = '+zoomX , 17,121);
	ctx.fillText('zoom Y = '+zoomY , 17,131);

	var close=[]
	,   q
	;
for (q=1; q<3; q++){
	for (n=1; n<=max; n++){
		plot(n);
		if (n>=3){
			let  a=n
			var  b=n-q,c=b, last=ND,guess=ND
			do {
				c=c-1
				let a3=a*a*a
				,	b3=b*b*b
				,	c3=c*c*c

				last=guess
				guess=a3-b3-c3;
				// fix this rule
				if (guess <0 && guess <= -c3 && b>4){
					_log('---',guess)
					b=b-1;
					c=b-1;
				}
				//else _log(guess,c3)

			}
			while(guess<0)
			if (guess<=27) _log(q,a,b,c,last,guess)
		}
	}
}	
	let closest=[7,9,14,18,41,49,65,98,163,144]
	//_log(closest.length);
	for (n=0; n<closest.length; n++){
		plot(closest[n],'#f446');
//		plot(closest[n]-1,'#a446');
	}
	
	
	
	
	