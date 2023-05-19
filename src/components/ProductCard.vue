<template>
    <div class="product-card">
        <a 
            class="product-card__header" 
            href="" 
            :title="params.name" 
            :aria-label="params.name"
        >
            <img 
                class="product-card__pic" 
                :src="params.image" 
                :alt="params.name" 
                loading="lazy"
            >
        </a>

        <div class="product-card__main">
            <ul class="product-card-desc">
                <li class="product-card-desc__item --type">{{ params.category }}</li>
                <li class="product-card-desc__item --name"><a href="">{{ params.name }}</a></li>
                <li class="product-card-desc__item --comment">{{ params.comment }}</li>
                <li class="product-card-desc__item --price">{{ params.price }} <abbr title="Рубль">₽</abbr></li>
            </ul>
        </div>

        <div class="product-card__footer">
            <button 
                class="product-card__trigger btn btn--default"
                type="button"
                :disabled="(!params.available || !params.allowed)"
            >{{ (params.available == true || params.allowed == true) ? 'В корзину' : 'Нет в наличии' }}</button>
        </div>
    </div>
</template>

<style>
    .product-card {
        display: flex;
        flex-direction: column;

        padding: 23px 32px;
        box-shadow: var(--shadow-secondary);
        background-color: var(--bg-secondary);
        border-radius: 0px 0px var(--radius-primary) var(--radius-primary);
    }

    .product-card__header {
        flex: 0 0 auto;
    }

    .product-card__main {
        flex: 1 0 auto;
        margin: 5px 0px 15px;
    }

    .product-card__pic {
        width: 100%;
    }

    .product-card__trigger {
        width: 100%;
    }

    .product-card-desc {
        margin:0;
        padding: 0;
        font-size: 16px;
        list-style: none;
        text-align: center;
    }

    .product-card-desc__item + .product-card-desc__item {
        margin-top: 10px;
    }

    .product-card-desc__item.--type {
        font-size: 14px;
        color: var(--dark-gray-primary);
    }

    .product-card-desc__item.--name {
        font-size: 20px;
        font-weight: 600;
    }
    
    .product-card-desc__item.--name a {
        text-decoration: none;
        color: var(--black-primary);
    }

    .product-card-desc__item.--price {
        font-size: 26px;
        font-weight: 600;
    }


    /* *** Адаптивная часть *** */


    /* medium_m */
    @media screen and (max-width: 980px) {
        .product-card {
            padding: 30px 20px;
        }

        .product-card-desc__item.--name {
            font-size: 18px;
        }

        .product-card-desc__item.--price {
            font-size: 20px;
        }
    }
</style>

<script>
    export default {
        name: 'ProductCard',
        props: {
            params: Object,
        }
    }
</script>