function Stats() {

    const stats = [

        {
            number:"500+",
            label:"Hackathons"
        },

        {
            number:"20K+",
            label:"Participants"
        },

        {
            number:"8K+",
            label:"Projects"
        },

        {
            number:"100+",
            label:"Judges"
        }

    ];

    return(

        <section className="max-w-7xl mx-auto px-6 py-20">

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                {stats.map((item,index)=>(

                    <div
                    key={index}
                    className="rounded-3xl border border-white/70 bg-white/80 backdrop-blur-xl shadow-[0_18px_50px_rgba(15,23,42,0.08)] p-10 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(37,99,235,0.12)] duration-300">

                        <div className="h-1.5 w-14 rounded-full bg-gradient-to-r from-blue-600 to-slate-900 mb-6" />

                        <h2 className="text-5xl font-extrabold tracking-tight text-slate-900">

                            {item.number}

                        </h2>

                        <p className="mt-3 text-slate-500 font-medium">

                            {item.label}

                        </p>

                    </div>

                ))}

            </div>

        </section>

    )

}

export default Stats;