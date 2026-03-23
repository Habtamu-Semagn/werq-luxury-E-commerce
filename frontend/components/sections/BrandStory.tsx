export default function BrandStory() {
    return (
        <section className="py-32 bg-muted/30 text-center px-4">
            <div className="container mx-auto max-w-3xl flex flex-col items-center">
                <h2 className="font-luxury text-3xl md:text-5xl mb-8 tracking-wide text-foreground">The Philosophy of Less</h2>
                <div className="w-12 h-[1px] bg-foreground/30 mb-8"></div>
                <p className="font-standard text-muted-foreground leading-relaxed md:text-lg mb-10">
                    At WERQ, we believe that true luxury lies in restraint. Our pieces are crafted with an uncompromising dedication to profound simplicity, sourcing only the finest sustainable materials to create timeless artifacts that transcend seasonal trends.
                </p>
                <span className="font-luxury text-xl text-foreground/80 italic">"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."</span>
            </div>
        </section>
    );
}
