import { Section } from "@/components/section";

export default function Loading() {
    return (
        <div className="min-h-screen bg-background text-foreground relative animate-pulse">
            <main id="main-content" className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-16 pt-16">
                <Section id="loading-intro" className="min-h-screen flex items-center relative">
                    <div className="gap-12 sm:gap-16 w-full relative z-10">
                        <div className="lg:col-span-3 space-y-8 sm:space-y-10">
                            {/* Avatar skeleton */}
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-secondary/50"></div>
                                <div>
                                    <div className="h-5 w-32 bg-secondary/50 rounded mt-1"></div>
                                    <div className="h-4 w-24 bg-secondary/30 rounded mt-2"></div>
                                </div>
                            </div>

                            {/* Title skeleton */}
                            <div className="space-y-3">
                                <div className="h-12 w-3/4 bg-secondary/50 rounded"></div>
                                <div className="h-12 w-2/3 bg-secondary/50 rounded"></div>
                            </div>

                            {/* Description skeleton */}
                            <div className="space-y-2 max-w-2xl">
                                <div className="h-5 w-full bg-secondary/30 rounded"></div>
                                <div className="h-5 w-5/6 bg-secondary/30 rounded"></div>
                                <div className="h-5 w-4/6 bg-secondary/30 rounded"></div>
                            </div>

                            {/* Buttons skeleton */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <div className="h-12 w-40 bg-secondary/50 rounded-lg"></div>
                                <div className="h-12 w-48 bg-secondary/30 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </Section>
            </main>
        </div>
    );
}
