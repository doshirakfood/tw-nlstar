<template>
    <div class="location">
        <button 
            class="location__trigger btn btn--link" 
            type="button" 
            title="Выберите населённый пункт"
            aria-label="Select locality"
            @click="isPopupVisible = true"
        >
            <SvgIcon class="icon icon--left" name="location"></SvgIcon>
            {{ $store.state.main.location.city }}
        </button>

        <BasicPopup 
            :class="['location__popup', {'popup--show': isPopupVisible}]"
            @close="isPopupVisible = false"
        >
            <form clas="location-form" @submit="ListenerLocationSubmit">
                <p class="location-form__name subtitle">Выбор населённого пункта:</p>
                
                <div class="location-form__row">
                    <LocationDataList 
                        class="location-form__col --8x"  
                        v-bind:params="datalistParams" 
                        @locationDataListChange="ListenerLocationChange"
                    />

                    <button 
                        class="location-form__col btn btn--default" 
                        type="submit"
                        :disabled="isDisabledSubmit"
                    >Подтвердить</button>
                </div>
            </form>
        </BasicPopup>
    </div>

</template>

<style scoped>
    .location__trigger {
        font-size: 16px;
    }

    .location-form__name {
        margin: 0px 0px 12px;
    }

    .location-form__row {
        margin: -10px;
        display: flex;
        flex-wrap: wrap;
    }

    .location-form__col {
        margin: 10px;
        flex-grow: 1;
    }

    .location-form__col.--8x {
        flex-basis: calc(((100% / 12) * 8) - 20px);
    }
</style>

<script>
    import SvgIcon          from './SvgIcon.vue'
    import LocationDataList from './LocationDataList.vue'
    import BasicPopup       from './ui/BasicPopup.vue'

    export default {
        name: "LocationMain",
        components: {
            SvgIcon,
            BasicPopup,
            LocationDataList,
        },

        data() {
            return {
                locationNewParams: {},
                isPopupVisible:   false,
                isDisabledSubmit: true,
                datalistParams: {
                    placeholder: 'Например, Санкт-петербург',
                    value: this.$store.state.main.location.city,
                }
            }
        },

        methods: {

            ListenerLocationChange(data) {
                
                this.locationNewParams = data.params;
                this.isDisabledSubmit = !data.status;
            
            },


            ListenerLocationSubmit(event) {

                this.isPopupVisible = false;
                this.$store.state.main.location = this.locationNewParams;

                localStorage.setItem('locationParams', JSON.stringify(this.locationNewParams));                
                event.preventDefault();

            }

        }
    }
</script>