<template>
    <div class="category-cards">
        <div class="category-cards__row">
            <router-link 
                class="category-cards__col btn btn--link"
                v-for="(variable, index) in items"
                :key="index"
                :to="`/category/${variable.slug}`"
                :title="variable.name"
                :aria-label="variable.name"
                :style="`--bg-image: url('${variable.image}')`"
            >
                <span class="category-cards__name">{{ variable.name }}</span>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
    .category-cards__row {
        margin: -10px;
        display: flex;
        flex-wrap: wrap;
    }

    .category-cards__col {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;

        color: #fff;
        font-size: 24px;
        margin: 10px;
        padding: 20px;
        overflow: hidden;
        min-height: 152px;
        flex-basis: calc((100% / 4) - 20px);
        border-radius: var(--radius-primary);
        
        background: var(--black-primary);
        background-image: var(--bg-image);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center right;
    }


    /* lg_s */
    @media screen and (max-width: 1280px) {
        .category-cards__col {
            font-size: 18px;
        }
    }

    /* medium_m */
    @media screen and (max-width: 980px) {
        .category-cards.loading-mask:before {
            background-size: 32% 170px;
        }
        .category-cards__col {
            flex-basis: calc((100% / 3) - 20px);
        }
    }

    /* small_m */
    @media screen and (max-width: 650px) {
        .category-cards.loading-mask:before {
            background-size: 49% 170px;
        }
        .category-cards__col {
            flex-basis: calc((100% / 2) - 20px);
        }
    }

    /* small_s */
    @media screen and (max-width: 480px) {
        .category-cards.loading-mask:before {
            background-size: 50% 170px;
        }
        .category-cards__col {
            flex-basis: calc((100% / 1) - 20px);
        } 
    }
</style>

<script>

    export default {
        name:  'CategoryCards',
        props: {
            items: Object
        }
    }
</script>