class Scroll {
    constructor(obj) {
        this.elements = document.querySelectorAll(obj.el);
        this.rem = obj.el
        this.scroll();
    }

    scroll() {
        this.scrollCard();
        window.addEventListener('scroll', () => this.scrollCard());
        window.addEventListener('resize', () => this.scrollCard());
        window.addEventListener('load', () => this.scrollCard());

    }

    scrollCard() {
        const height = window.innerHeight;
        let time = 0

        this.elements.forEach(element => {
            const elTop = element.getBoundingClientRect().top;

            if (elTop < height *1.1) {
                setTimeout(() => {
                    element.classList.add('active');
                }, time);
                time += 100
            }
        });
    }
}
class Load {
    constructor(obj) {
        this.elements = document.querySelectorAll(obj.el);
        this.load();
    }

    load() {
        window.addEventListener('load', () => this.scrollCard());
    }

    scrollCard() {
        let time = 0;

        this.elements.forEach(element => {
            setTimeout(() => {
                element.classList.add('active');
                element.classList.remove('fade-top')
            }, time);
            time += 150
        });
    }
}
const scrollLoad = new Load({
    el: '.fade-top',
});
const sroll = new Scroll({
    el: '.card'
});
class Tilt {
    constructor(obj) {
        this.tiltCards = document.querySelectorAll(obj.el);
        this.angle = 10;
        this.tiltCards.forEach((card) => {
            card.addEventListener('mousemove', (e) => this.tilt(card, e, 20));
            card.addEventListener('mouseleave', () => card.style.transform = '');
        })

    }

    tilt(elem, e, angle) {
        const rect = elem.getBoundingClientRect();
        const halfW = rect.width / 2;
        const halfY = rect.height / 2;
        const x = (e.clientX - rect.left - halfW) / halfW;
        const y = (e.clientY - rect.top - halfY) / halfY;
        elem.style.transform = `perspective(1000px) rotateX(${y * angle}deg) rotateY(${-x * angle}deg) scale3d(1,1,1)`;
    }

}
class ParallaxMove {
    constructor(obj) {
        this.imgs = document.querySelectorAll(obj.imgs)
        window.addEventListener('mousemove', (e) => {
            this.move(e)
        })
    }
    move(e) {
        this.imgs.forEach(img => {
            const speed = img.getAttribute("data-speed")
            const x = (window.innerWidth - e.pageX * speed) / 50
            const y = (window.innerHeight - e.pageY * speed) / 100

            img.style.transform = `translate(${x}px, ${y}px)`
        })
    }
}
const parallaxMove = new ParallaxMove({
    imgs: '.project__img'
})
const tilt = new Tilt(
    {
        el: '.tilt'
    }
)
class Text {
    constructor(obj) {
        this.el = document.querySelector(obj.el)
        this.fulltext = this.el.innerHTML
        this.el.innerHTML = ''
        this.str()
    }
    str(x = 0) {
        this.el.innerHTML += this.fulltext[x]
        x++

        if (x <= this.fulltext.length) {
            setTimeout(() => {
                this.str(x)
            }, 150);
        } else {
            this.el.innerHTML = 'Virtual Reality Business Solutions'
        }
    }
}
const text = new Text({
    el: '.banner__desc-title'
})

class ParallaxMoveBanner {
    constructor(obj) {
        this.img = document.querySelector(obj.img)
        window.addEventListener('mousemove', (e) => {
            this.move(e)
        })
    }
    move(e) {
        const speed = this.img.getAttribute("data-speed")
        const x = (window.innerWidth - e.pageX * speed) / 50
        const y = (window.innerHeight - e.pageY * speed) / 100
        this.img.style.transform = `translate(${x}px, ${y}px)`
    }
}
const parallaxBanner = new ParallaxMoveBanner({
    img: '.bannerParallax'
})

const newsScroll = new Scroll({
    el: '.card'
})