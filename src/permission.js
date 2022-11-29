import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from "@/router";

NProgress.configure({showSpinner: false}) // NProgress Configuration

// register global progress.
router.beforeEach((to, from, next) => {
        NProgress.start() // start progress bar
        next()
    }
)

router.afterEach(() => {
        NProgress.done() // finish progress bar
    }
)
