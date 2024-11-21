<script>
        import Table from "../lib/Table.svelte";
        export let data;
</script>

<main
        class="relative flex flex-col items-center justify-center min-h-screen py-10"
>
        <a
                href="https://vercel.com"
                class="px-6 py-2 text-sm font-medium text-gray-600 transition-all rounded-full shadow-sm bg-white/30 dark:bg-white/80 ring-1 ring-gray-900/5 dark:text-black hover:shadow-lg active:shadow-sm"
        >
                Intervjue 2024
        </a>
        <h1
                class="pt-4 pb-8 bg-gradient-to-br dark:from-white from-black via-[#707070] to-[#ffffff] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
                Postgres on Vercel
        </h1>
        <Table users={data?.users} duration={data?.duration} />
</main>
