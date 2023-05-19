<template>
    <div class="location-datalist">
        <div 
            :class="['location-datalist__header', { 'location-datalist--show': showDropdown }]" 
            @click="ListenerVisible">
            <input 
                class="location-datalist__field" 
                type="text"
                :required="params.required || false"
                :placeholder="params.placeholder || 'Найти...'"
                :minlength="params.minlength || 3"
                :maxlength="params.maxlength || 1000"
                v-model="searchValue"
                @input="ListenerSearch"
            >

            <button 
                class="location-datalist__close" 
                type="button"
                title="Очистить поле"
                aria-label="Clear field"
                @click="ListenerClear"
            >
                <SvgIcon name="close"></SvgIcon>
            </button>
        </div>

        <div 
            :class="[
                'location-datalist__dropdown',                
                {'location-datalist--show': showDropdown}
            ]"
            :style="`
                --dropdownTop:   ${positionDropdown.top};
                --dropdownLeft:  ${positionDropdown.left};
                --dropdownWidth: ${positionDropdown.width};
            `"
        >
            <ul
                role="listbox" 
                style="--mask-height: 90px; --mask-size: 100% 44px;"
                @click="ListenerDropdown"
                :class="['location-datalist__listbox', {'loading-mask': isLoading}]"
            >
                <li 
                    role="option"
                    v-for="(variable, index) in listItems"
                    :class="['location-datalist__option', {'--not-found': isNotFound}]" 
                    :key="index"
                    :data-option-params="JSON.stringify(variable)"
                >{{ variable.label }}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .location-datalist {
        display: flex;
        flex-direction: column;
    }

    .location-datalist__header {
        display: flex;
        position: relative;
    }

    .location-datalist__header,
    .location-datalist__dropdown {
        border-radius: var(--radius-primary); 
        border: 1px solid var(--color-border-primary);
    }

    .location-datalist__field {
        flex-grow: 1;
        border: 0px;
        margin: 1px;
        padding: 12px 40px 12px 15px;
    }

    .location-datalist__field:placeholder-shown + .location-datalist__close {
        opacity: 0;
    }

    .location-datalist__close {
        top: 0px;
        right: 20px;
        bottom: 0px;
        position: absolute;
                
        padding: 0px;
        margin: auto;
        height: 16px;
        width: 16px;
        fill: var(--dark-gray-primary);
        
        opacity: 1;
        transition: opacity var(--transition-primary);
    }

    .location-datalist__close svg {
        width: 12px;
        height: 12px;
    }

    .location-datalist__dropdown {        
        top: var(--dropdownTop);
        left: var(--dropdownLeft);
        width: var(--dropdownWidth);
        position: fixed;

        overflow-y: auto;
        z-index: 99999;
        max-height: 170px;
        padding: 5px 15px;
        background-color: var(--bg-secondary);

        opacity: 0;
        visibility: hidden;
    }

    .location-datalist__listbox {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .location-datalist__option {
        cursor: pointer;
        padding: 7px 0px;
        color: var(--dark-gray-primary);
        transition: all var(--transition-primary);
    }

    .location-datalist__option.--not-found {
        cursor: default;
        pointer-events: none;
    }

    .location-datalist__option:hover {
        color: inherit;
    }

    .location-datalist__option:active {
        transform: var(--active-effect-primary);
    }

    /* show */
    .location-datalist__header.location-datalist--show.location-datalist--bottom {
        border-bottom: 0px;
        border-radius: var(--radius-primary) var(--radius-primary) 0px 0px;
    }

    .location-datalist__dropdown.location-datalist--show.location-datalist--bottom {
        border-top: 0px;
        border-radius: 0px 0px var(--radius-primary) var(--radius-primary);
    }

    .location-datalist__dropdown.location-datalist--show {
        opacity: 1;
        visibility: visible;
    }
</style>

<script>
    import SvgIcon from '@components/SvgIcon.vue'

    export default {
        name: 'LocationDataList',
        components: {
            SvgIcon,
        },
        props: {
            params: Object,
        },

        data() {
            return {
                isNotFound:   false,
                isLoading:    false,
                showDropdown: false,
                positionDropdown: {
                    top:   '0px',
                    right: '0px',
                    width: '0px',
                },

                listItems:   [],
                searchValue: this.$props.params.value || null,
            }
        },

        mounted() {

            this.$nextTick(function () {

                this.dropdown = this.$el.querySelector('.location-datalist__dropdown');
                document.body.append(this.dropdown);
            
            })

        },

        methods: {

            ListenerVisible(event) {

                let target = event.target;


                if (target.closest('.location-datalist__close') == null) {

                    this.MethodCoords();
                    this.showDropdown = !this.showDropdown;

                    document.addEventListener('click', this.ListenerClickByArea, false);
                    
                    if (this.listItems.length == 0) {
                        
                        this.MethodGetCitеs(this.searchValue);
                    
                    }                
                
                }
                
            },
            
            
            ListenerDropdown(event) {
                
                let target = event.target;


                if (
                    target.closest('.location-datalist__option')            !== null && 
                    target.closest('.location-datalist__option.--not-found') == null
                ) {

                    let params = JSON.parse(target.getAttribute('data-option-params'));


                    this.searchValue = params.city;                                        
                    this.$emit('locationDataListChange', {'params': params, 'status': true});

                    this.showDropdown           = false;
                    this.positionDropdown.top   = '0px';
                    this.positionDropdown.left  = '0px';
                    this.positionDropdown.width = '0px';
                
                }

            },


            ListenerSearch(event) {

                let target = event.target,
                    min = target.getAttribute('minlength');

            
                if (target.value.length > min) {

                    this.MethodCoords();
                    this.showDropdown = true;

                    this.MethodGetCitеs(target.value);

                } 
                
                
                if (target.value.length == 0) {
                   
                    this.showDropdown = false;
                    this.$emit('locationDataListChange', {'params': {}, 'status': false});
            
                }

            },


            ListenerClear() {

                this.searchValue = '';
                this.$emit('locationDataListChange', {'params': {}, 'status': false});

            },


            ListenerClickByArea(event) {

                let target = event.target;


                if (
                    target.closest('.location-datalist')           == null &&
                    target.closest('.location-datalist__dropdown') == null 
                ) {

                    this.showDropdown = false;
                    document.removeEventListener('click', this.ListenerClickByArea, false);

                }

            },


            MethodGetCitеs(cityName) {

                let url = `${this.$store.state.main.getURL.city}?term=${cityName}`;                

                
                this.listItems = [];
                this.isLoading = true;

                this.$axios
                    .get(url)
                    .then((response) => {

                        let data = response.data;

                        if (data.data.length > 0) {
                            
                            this.isNotFound = false;
                            this.listItems  = data.data;
                            
                        } else {
                            
                            this.isNotFound = true;
                            this.listItems  = [{'label': 'Ничего не найдено...'}];
                            this.$emit('locationDataListChange', {'params': {}, 'status': false});
                        
                        }

                    })
                    .catch((error) => {

                        console.log(error)

                    })
                    .finally(() => {

                        this.isLoading = false;

                    });

            },


            MethodCoords() {

                this.positionDropdown.top   = `${this.$el.getBoundingClientRect().bottom}px`;
                this.positionDropdown.left  = `${this.$el.getBoundingClientRect().left}px`;
                this.positionDropdown.width = `${this.$el.getBoundingClientRect().width}px`;

            }

        }
    }
</script>