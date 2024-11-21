<script lang="ts">
        import { dayStore } from "$lib/store";
        import { get } from "svelte/store";

        const day = get(dayStore); // Get the current value of the store (read-only)

        const bookTimeslot = (id: number) => {
                // Update a specific timeslot to mark it as booked
                dayStore.update((currentDay) => {
                        const timeslot = currentDay.timeslots.find(
                                (slot) => slot.id === id,
                        );
                        if (timeslot) {
                                timeslot.available = false;
                                timeslot.user = {
                                        name: "John Doe",
                                        email: "john.doe@example.com",
                                        role: "user",
                                };
                        }
                        return currentDay;
                });
        };
</script>

<main>
        <h1>Schedule for {day.date}</h1>
        <form>
                <div>
                        <label for="name">Email</label>
                        <input type="text" id="email" name="email" value="" />
                </div>
                <div>
                        <label for="name">Password</label>
                        <input
                                type="password"
                                id="password"
                                name="password"
                                value=""
                        />
                </div>
                <div>
                        <label for="name">Telefon</label>
                        <input type="text" id="tlf" name="tlf" value="" />
                </div>
                <div>
                        <label for="name">Email</label>
                        <input type="text" id="email" name="email" value="" />
                </div>

                <button type="submit" on:click={submitForm}> Register </button>
        </form>
        <ul>
                {#each $dayStore.timeslots as timeslot}
                        <li
                                class={timeslot.available
                                        ? "available"
                                        : "booked"}
                                on:click={() =>
                                        timeslot.available &&
                                        bookTimeslot(timeslot.id)}
                        >
                                {timeslot.start_time} - {timeslot.end}
                                {#if !timeslot.available}
                                        (Booked by {timeslot.user?.name})
                                {/if}
                        </li>
                {/each}
        </ul>
</main>

<style>
        ul {
                list-style-type: none;
                padding: 0;
        }

        li {
                padding: 10px;
                margin: 5px 0;
                border: 1px solid #ccc;
                border-radius: 5px;
                cursor: pointer;
        }

        li.available {
                background-color: #28a745;
                color: white;
        }

        li.booked {
                background-color: #dc3545;
                color: white;
                cursor: not-allowed;
        }

        li:hover.available {
                background-color: #218838;
        }
</style>
