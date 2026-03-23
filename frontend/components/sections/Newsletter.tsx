"use client";

export default function Newsletter() {
    return (
        <section className="py-32 bg-background border-y border-foreground/5">
            <div className="container mx-auto px-4 max-w-xl text-center">
                <h2 className="font-luxury text-3xl mb-4">Join The Inner Circle</h2>
                <p className="text-muted-foreground text-sm uppercase tracking-widest mb-10 leading-relaxed">
                    Exclusive access to new collections, private showroom events, and editorial insights.
                </p>

                <form className="flex flex-col sm:flex-row gap-4 items-center justify-center" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full sm:flex-1 bg-transparent border-b border-foreground/30 py-3 px-2 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground placeholder:uppercase placeholder:tracking-widest placeholder:text-xs"
                    />
                    <button
                        type="submit"
                        className="w-full sm:w-auto border border-foreground/20 text-foreground px-8 py-3 uppercase tracking-widest text-xs hover:bg-foreground hover:text-background transition-colors duration-300"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
}
