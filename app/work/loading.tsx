// Root loading state for all project detail pages
export default function ProjectLoading() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-16 animate-pulse">
            <main id="main-content" className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-16 pt-16">
                {/* Back button skeleton */}
                <div className="h-4 w-24 bg-secondary/50 rounded mb-8"></div>

                {/* Title skeleton */}
                <div className="h-10 w-3/4 sm:w-1/2 bg-secondary/50 rounded mb-4"></div>

                {/* Meta data skeleton */}
                <div className="flex gap-4 mb-10">
                    <div className="h-6 w-20 bg-secondary/30 rounded-full"></div>
                    <div className="h-6 w-16 bg-secondary/30 rounded-full"></div>
                </div>

                {/* Hero image skeleton */}
                <div className="aspect-video w-full bg-secondary/20 rounded-xl mb-12"></div>

                {/* Content body skeleton */}
                <div className="space-y-4 max-w-3xl">
                    <div className="h-4 w-full bg-secondary/30 rounded"></div>
                    <div className="h-4 w-11/12 bg-secondary/30 rounded"></div>
                    <div className="h-4 w-full bg-secondary/30 rounded"></div>
                    <div className="h-4 w-5/6 bg-secondary/30 rounded"></div>
                    <div className="h-4 w-3/4 bg-secondary/30 rounded pt-4 mt-8"></div>
                    <div className="h-4 w-full bg-secondary/30 rounded"></div>
                </div>
            </main>
        </div>
    );
}
