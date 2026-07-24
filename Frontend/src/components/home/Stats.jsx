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

                {

                    stats.map((item,index)=>(

                        <div
                        key={index}
                        className="
                        rounded-3xl
                        border
                        border-gray-200
                        bg-white/70
                        backdrop-blur-xl
                        shadow-lg
                        p-10
                        hover:-translate-y-2
                        duration-300">

                            <h2
                            className="text-5xl font-bold">

                                {item.number}

                            </h2>

                            <p
                            className="mt-3 text-gray-500">

                                {item.label}

                            </p>

                        </div>

                    ))

                }

            </div>

        </section>

    )

}

export default Stats;