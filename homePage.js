const sliderConfig = {
    glAnimTime: 1,
    uiAnimTime: 0.7,
    autoChangeDelay: 3.5,
    trackpadPower: 4,
    uNoiseDist: 1.16,
    uWaveDist: 0.03,
    uVertDist: 12,
}

class SliderUIController {
    constructor() {
        this.bind()
    }

    init(projects) {
        this.projects = projects
        this.nameList = document.querySelector('.names')
        this.nameHolder = document.querySelector('.name-holder')
        this.numberList = document.querySelector('.numbers')
        document.querySelector('.slide-number').innerHTML = projects.length


        this.offsetY = 0
        this.stepSize = 0

        this.lastSlide = 0


        this.populate()
    }

    populate() {

        this.projects.forEach((proj, i) => {
            if (i == 0) {
                let preName = document.createElement('li')
                preName.style.height = this.nameHolder.offsetHeight + "px"
                preName.innerHTML = this.projects[this.projects.length - 1].name
                this.nameList.appendChild(preName)

                let preNumber = document.createElement('li')
                preNumber.style.height = this.nameHolder.offsetHeight + "px"
                preNumber.innerHTML = this.projects.length
                this.numberList.appendChild(preNumber)
            }
            let name = document.createElement('li')
            name.style.height = this.nameHolder.offsetHeight + "px"
            name.innerHTML = proj.name
            this.nameList.appendChild(name)

            let number = document.createElement('li')
            number.style.height = this.nameHolder.offsetHeight + "px"
            number.innerHTML = i + 1
            this.numberList.appendChild(number)

            if (i == this.projects.length - 1) {
                let postName = document.createElement('li')
                postName.style.height = this.nameHolder.offsetHeight + "px"
                postName.innerHTML = this.projects[0].name
                this.nameList.appendChild(postName)

                let postNumber = document.createElement('li')
                postNumber.style.height = this.nameHolder.offsetHeight + "px"
                postNumber.innerHTML = 1
                this.numberList.appendChild(postNumber)
            }
        });

        this.nameList.style.top = "-100%"
        this.numberList.style.top = "-100%"
    }

    slideTo(slideId) {

        if (this.lastSlide == this.nameList.childNodes.length - 2 && slideId == 1) {
            this.nameList.style.top = "-100%"
            this.numberList.style.top = "-100%"
        }

        if (this.lastSlide == -1 && slideId == this.nameList.childNodes.length - 4) {
            this.nameList.style.top = `${-100 * (this.nameList.childNodes.length - 2)}%`
            this.numberList.style.top = `${-100 * (this.nameList.childNodes.length - 2)}%`
        }


        TweenLite.to(this.nameList, sliderConfig.uiAnimTime, {
            top: `${-100 * (slideId + 1)}%`,
        })

        TweenLite.to(this.numberList, sliderConfig.uiAnimTime, {
            top: `${-100 * (slideId + 1)}%`
        })
        this.lastSlide = slideId
    }

    bind() {
        this.init = this.init.bind(this)
        this.populate = this.populate.bind(this)
        this.slideTo = this.slideTo.bind(this)
    }
}
const map = ` 
    float map(float value, float inMin, float inMax, float outMin, float outMax) {
      return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
    }
    `
const noise3 = `vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 permute(vec4 x) {
         return mod289(((x*34.0)+1.0)*x);
    }
    
    vec4 taylorInvSqrt(vec4 r)
    {
      return 1.79284291400159 - 0.85373472095314 * r;
    }
    
    float snoise(vec3 v)
      {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    
    // First corner
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;
    
    // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
    
      //   x0 = x0 - 0.0 + 0.0 * C.xxx;
      //   x1 = x0 - i1  + 1.0 * C.xxx;
      //   x2 = x0 - i2  + 2.0 * C.xxx;
      //   x3 = x0 - 1.0 + 3.0 * C.xxx;
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
      vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
    
    // Permutations
      i = mod289(i);
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    
    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
      float n_ = 0.142857142857; // 1.0/7.0
      vec3  ns = n_ * D.wyz - D.xzx;
    
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
    
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
    
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
    
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
    
      //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
      //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
    
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
    
    //Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
    
    // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
      }`

const vernoiNoise = `  
    const mat2 myt = mat2(.12121212, .13131313, -.13131313, .12121212);
    const vec2 mys = vec2(1e4, 1e6);
    
    vec2 rhash(vec2 uv) {
      uv *= myt;
      uv *= mys;
      return fract(fract(uv / mys) * uv);
    }
    
    vec3 hash(vec3 p) {
      return fract(
          sin(vec3(dot(p, vec3(1.0, 57.0, 113.0)), dot(p, vec3(57.0, 113.0, 1.0)),
                   dot(p, vec3(113.0, 1.0, 57.0)))) *
          43758.5453);
    }
    
    vec3 voronoi3d(const in vec3 x) {
      vec3 p = floor(x);
      vec3 f = fract(x);
    
      float id = 0.0;
      vec2 res = vec2(100.0);
      for (int k = -1; k <= 1; k++) {
        for (int j = -1; j <= 1; j++) {
          for (int i = -1; i <= 1; i++) {
            vec3 b = vec3(float(i), float(j), float(k));
            vec3 r = vec3(b) - f + hash(p + b);
            float d = dot(r, r);
    
            float cond = max(sign(res.x - d), 0.0);
            float nCond = 1.0 - cond;
    
            float cond2 = nCond * max(sign(res.y - d), 0.0);
            float nCond2 = 1.0 - cond2;
    
            id = (dot(p + b, vec3(1.0, 57.0, 113.0)) * cond) + (id * nCond);
            res = vec2(d, res.x) * cond + res * nCond;
    
            res.y = cond2 * d + nCond2 * res.y;
          }
        }
      }
    
      return vec3(sqrt(res), abs(id));
    }`

function vertexShader() {
    return `
          varying vec2 vUv; 
          varying vec3 vPos; 
    
          void main() {
            vUv = uv; 
            vPos = position; 
    
            vec3 pos = position;
    
            vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * modelViewPosition; 
          }
        `
}

function fragmentShaderFlow() {
    return noise3 + `
        varying vec2 vUv; 
        varying vec3 vPos; 
        
        uniform float uTime;
        uniform float uWiggleInt;
        uniform float uTexMix;
    
        uniform sampler2D uTexFrom;
        uniform sampler2D uTexTo;
    
        uniform vec2 uRepeatFrom;
        uniform vec2 uOffsetFrom;
        uniform vec2 uRepeatTo;
        uniform vec2 uOffsetTo;
    
    
        uniform float uNoiseDist;
        uniform float uWaveDist;
        uniform float uVertDist;
    
        
        void main() {
          vec2 nUv = vUv;
          nUv.x*=5.;
          nUv.x+=sin(nUv.y*50.)*uWaveDist;
          float n = snoise(vec3(nUv*uNoiseDist, uTime*0.1));
    
          vec2 fromUv = vUv;
          fromUv*=uRepeatFrom;
          fromUv+=uOffsetFrom;
          
          fromUv.y+=n*uWiggleInt;
    
          vec2 toUv = vUv;
          toUv*=uRepeatTo;
          toUv+=uOffsetTo;
    
          toUv.y+=n*(1.-uWiggleInt);
    
          vec4 fromTex = texture2D(uTexFrom, fromUv);
          vec4 toTex = texture2D(uTexTo, toUv);
    
    
          float sN = step(n, uTexMix);
    
          vec4 col = mix(fromTex,toTex, uTexMix);
          gl_FragColor = vec4(col);
           //gl_FragColor = vec4(flowTex);
        }
    `
}

class ThreeSlider {
    constructor() {
        this.bind()

        this.camera
        this.scene
        this.renderer
        this.controls
        this.textureLoader = new THREE.TextureLoader()
        this.currSlide = -1

        this.transSlide = 0

        this.mouseXClick = null
        this.downFlag = false
        this.releaseFlag = true

        this.mousePos = new THREE.Vector2(-2000, 2000)
    }

    init(container, imgs, flowMapContainer) {
        this.imgs = imgs
        this.imgTextures = []

        this.animTime = sliderConfig.glAnimTime;
        this.mouseAnimTime = .5


        this.container = container
        this.contWidth = container.offsetWidth
        this.contHeight = container.offsetHeight

        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(container.offsetWidth, container.offsetHeight)
        this.renderer.debug.checkShaderErrors = true
        container.appendChild(this.renderer.domElement)

        this.renderer.setPixelRatio(window.devicePixelRatio)

        this.scene = new THREE.Scene()

        this.camera = new THREE.OrthographicCamera(this.contWidth / - 2, this.contWidth / 2, this.contHeight / 2, this.contHeight / - 2, 1, 1000);
        this.camera.position.set(0, 0, 200)

        this.container.addEventListener('mousedown', this.onDown)
        this.container.addEventListener('mouseup', this.onUp)
        this.container.addEventListener('mouseleave', this.onUp)
        this.container.addEventListener('mousemove', this.onMove)


        this.loadImgs()
        this.lastContSize = [window.innerWidth, window.innerHeight]


        window.addEventListener('mousemove', this.mouseMove)
        RAF.subscribe('threeSceneUpdate', this.update)
    }



    loadImgs() {
        this.imgs.forEach((img, i) => {
            let tex = this.textureLoader.load(img, (obj) => {

                let aspectOfPlane = this.contWidth / this.contHeight;
                let aspectOfImage = obj.image.width / obj.image.height;
                let yScale = 1;
                let xScale = aspectOfPlane / aspectOfImage;
                if (xScale > 1) {
                    xScale = 1;
                    yScale = aspectOfImage / aspectOfPlane;
                }
                tex.repeat.set(xScale, yScale);

                tex.offset.set((1 - xScale) / 2, (1 - yScale) / 2);
                tex.needsUpdate = true;


                this.imgTextures[i] = tex
                if (this.imgTextures.length == this.imgs.length)
                    this.imagesLoaded()
            })
        });
    }

    imagesLoaded() {
        this.uniforms = {
            uTime: { value: 0 },
            uTexMix: { value: 0 },
            uWiggleInt: { value: 0 },
            uTexFrom: { value: this.imgTextures[0] },
            uTexTo: { value: this.imgTextures[0] },
            uRepeatFrom: { value: this.imgTextures[0].repeat },
            uOffsetFrom: { value: this.imgTextures[0].offset },
            uRepeatTo: { value: this.imgTextures[0].repeat },
            uOffsetTo: { value: this.imgTextures[0].offset },
            uNoiseDist: { value: sliderConfig.uNoiseDist },
            uWaveDist: { value: sliderConfig.uWaveDist },
            uVertDist: { value: sliderConfig.uVertDist },
        }

        this.imgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1),
            new THREE.ShaderMaterial({
                uniforms: this.uniforms,
                vertexShader: vertexShader(),
                fragmentShader: fragmentShaderFlow(),
            }))
        // this.imgPlane.material = new THREE.MeshNormalMaterial()
        this.imgPlane.scale.x = this.contWidth
        this.imgPlane.scale.y = this.contHeight

        this.scene.add(this.imgPlane)
    }

    slideTo(imgIndex) {
        this.currSlide = imgIndex

        this.uniforms.uTexFrom.value = this.uniforms.uTexTo.value
        this.uniforms.uTexTo.value = this.imgTextures[imgIndex]
        this.uniforms.uRepeatFrom.value = this.uniforms.uTexFrom.value.repeat
        this.uniforms.uRepeatTo.value = this.uniforms.uTexTo.value.repeat
        this.uniforms.uOffsetFrom.value = this.uniforms.uTexFrom.value.offset
        this.uniforms.uOffsetTo.value = this.uniforms.uTexTo.value.offset

        this.uniforms.uTexMix.value = 0
        this.uniforms.uWiggleInt.value = 0

        TweenLite.to(this.uniforms.uTexMix, this.animTime, {
            value: 1,
            ease: Power2.easeOut
        })

        TweenLite.to(this.uniforms.uWiggleInt, this.animTime, {
            value: 1,
            ease: Power1.easeOut,
        })
    }


    update() {
        if (this.lastContSize[0] != window.innerWidth || window.innerHeight)
            this.resizeCanvas()
        this.lastContSize = [window.innerWidth, window.innerHeight]


        if (this.uniforms != undefined) {
            this.uniforms.uTime.value += RAF.dt * 0.01
        }


        this.renderer.render(this.scene, this.camera);
        this.renderer.setRenderTarget(null);

    }

    resizeCanvas() {
        this.contWidth = this.container.offsetWidth
        this.contHeight = this.container.offsetHeight
        this.renderer.setSize(this.contWidth, this.contHeight)
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()

        this.camera.top = this.contHeight / 2;
        this.camera.bottom = this.contHeight / - 2;
        this.camera.left = this.contWidth / - 2;
        this.camera.right = this.contWidth / 2;

        if (this.imgPlane == undefined)
            return

        this.imgPlane.scale.x = this.contWidth
        this.imgPlane.scale.y = this.contHeight

        this.imgTextures.forEach((tex, i) => {
            let aspectOfPlane = this.contWidth / this.contHeight;
            let aspectOfImage = tex.image.width / tex.image.height;
            let yScale = 1;
            let xScale = aspectOfPlane / aspectOfImage;

            if (xScale > 1) {
                xScale = 1;
                yScale = aspectOfImage / aspectOfPlane;
            }

            tex.repeat.set(xScale, yScale);
            tex.offset.set((1 - xScale) / 2, (1 - yScale) / 2);
            tex.needsUpdate = true;
        });


    }

    mouseMove(event) {
        this.mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mousePos.y = - (event.clientY / window.innerHeight) * 2 + 1;

    }

    bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this)
        this.update = this.update.bind(this)
        this.init = this.init.bind(this)
        this.loadImgs = this.loadImgs.bind(this)
        this.slideTo = this.slideTo.bind(this)
        this.mouseMove = this.mouseMove.bind(this)
    }
}

function initSliderModule() {

    let imgs = []
    projects.forEach(proj => {
        if (window.isMobile) {
            imgs.push(proj.imgUrlMobile)
        }
        else {
            imgs.push(proj.imgUrlDesktop)
        }
    });

    const glSliderContainer = document.querySelector('.slider-container')
    const threeSlider = new ThreeSlider()
    threeSlider.init(glSliderContainer, imgs, document.querySelector('.flowMapContainer'))

    const sliderUIController = new SliderUIController()
    sliderUIController.init(projects)
    const projLink = document.querySelector('.proj-link')

    let uiCurrSlide = threeSlider.currSlide
    let threeCurrSlide = threeSlider.currSlide

    let timer = document.querySelector('.counter .bar .fill')

    let allowInteraction = true


    let timerTl = new TimelineMax()
    timerTl.to(timer, sliderConfig.autoChangeDelay, {
        width: "100%",
        ease: Linear.easeNone,
        onComplete: () => {
            onNext()
        }
    }, 0).to(timer, 0.5, {
        width: "0%",
        onComplete: () => {
            timerTl.restart()
        }
    })

    function onInteraction() {

        allowInteraction = false
        setTimeout(() => {
            allowInteraction = true
        }, sliderConfig.glAnimTime * 1000)
        timerTl.pause()
        TweenLite.to(timer, 0.5, {
            width: "0%",
            onComplete: () => {
                timerTl.restart()
            }
        })
    }

    function onNext() {
        uiCurrSlide++
        threeCurrSlide++

        if (uiCurrSlide >= projects.length + 1)
            uiCurrSlide = 1
        if (threeCurrSlide >= projects.length)
            threeCurrSlide = 0

        sliderUIController.slideTo(uiCurrSlide)
        threeSlider.slideTo(threeCurrSlide)

    }

    function onPrev() {
        uiCurrSlide--
        threeCurrSlide--

        if (uiCurrSlide < -1)
            uiCurrSlide = projects.length - 2
        if (threeCurrSlide < 0)
            threeCurrSlide = projects.length - 1

        sliderUIController.slideTo(uiCurrSlide)
        threeSlider.slideTo(threeCurrSlide)
    }

    if (window.isMobile) {
        let touchPos
        glSliderContainer.addEventListener('touchstart', (e) => {
            touchPos = e.touches[0]
        })

        glSliderContainer.addEventListener('touchend', (e) => {
            if (!allowInteraction)
                return
            onInteraction()

            let dX = Math.abs(e.changedTouches[0].clientX - touchPos.clientX)
            let dY = Math.abs(e.changedTouches[0].clientY - touchPos.clientY)

            if (dX >= dY) {
                if (e.changedTouches[0].clientX < touchPos.clientX) onPrev()
                else onNext()
            } else {
                if (e.changedTouches[0].clientY > touchPos.clientY) onPrev()
                else onNext()
            }
        })
    } else {

        glSliderContainer.addEventListener('click', () => {
            if (!allowInteraction)
                return
            onInteraction()
            onNext()
        })

        let timer = null;
        let scrollingFlag = true;
        glSliderContainer.addEventListener('wheel', (e) => {
            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                scrollingFlag = true
            }, 150);

            if (!scrollingFlag)
                return
            scrollingFlag = false

            if (!allowInteraction)
                return
            // if (Math.abs(e.deltaY) < sliderConfig.trackpadPower || Math.abs(e.deltaX) < sliderConfig.trackpadPower)
            //     return
            onInteraction()
            if (e.deltaY < 0) {
                onPrev()
            } else {
                onNext()
            }
        })

    }

    projLink.addEventListener('click', () => {
        console.log('heyyyy')
        window.location.href = projects[threeCurrSlide].projUrl
    })

}
initSliderModule()