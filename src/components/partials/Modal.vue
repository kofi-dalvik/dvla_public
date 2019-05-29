<script>
    /**
     * Bootstrap Style Modal Component for Vue
     * Depend on Bootstrap.css
     */

     export default {
        props: {
            show: {
                type: Boolean,
                twoWay: true,
                default: false
            },
            title: {
                type: String,
                default: 'Modal'
            },
            small: {
                type: Boolean,
                default: false
            },
            medium: {
                type: Boolean,
                default: false
            },
            large: {
                type: Boolean,
                default: false
            },
            full: {
                type: Boolean,
                default: false
            },
            // 为true时无法通过点击遮罩层关闭modal
            force: {
                type: Boolean,
                default: false
            },
            // 自定义组件transition
            transition: {
                type: String,
                default: 'modal'
            },
            showOkButton: {
                type: Boolean,
                default: true
            },

            showCancelButton: {
                type: Boolean,
                default: true
            },

            // 确认按钮text
            okText: {
                type: String,
                default: 'OK'
            },
            // 取消按钮text
            cancelText: {
                type: String,
                default: 'Cancel'
            },
            // 确认按钮className
            okClass: {
                type: String,
                default: 'btn btn-primary btn-fill'
            },
            // 取消按钮className
            cancelClass: {
                type: String,
                default: 'btn btn-danger'
            },
            // 点击确定时关闭Modal
            // 默认为false，由父组件控制prop.show来关闭
            closeWhenOK: {
                type: Boolean,
                default: false
            },

            closeWhenCancel: {
                type: Boolean,
                default: true
            },

            bodyClass: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                duration: 5000
            };
        },
        computed: {
            modalClass () {
                return {
                    'modal-lg': this.large,
                    'modal-sm': this.small,
                    'modal-full': this.full,
                    'modal-md': this.medium
                }
            }
        },
        created () {
            if (this.show) {
                document.body.className += ' modal-open';
            }
        },
        beforeDestroy () {
            document.body.className = document.body.className.replace(/\s?modal-open/, '');
        },
        watch: {
            show (value) {
                // 在显示时去掉body滚动条，防止出现双滚动条
                if (value) {
                    document.body.className += ' modal-open';
                }
                // 在modal动画结束后再加上body滚动条
                else {
                    if (!this.duration) {
                        this.duration = window.getComputedStyle(this.$el)['transition-duration'].replace('s', '') * 1000;
                    }

                    window.setTimeout(() => {
                        document.body.className = document.body.className.replace(/\s?modal-open/, '');
                    }, this.duration || 0);
                }
            }
        },
        methods: {
            ok () {
                this.$emit('ok');
                if (this.closeWhenOK) {
                    this.close();
                }
            },
            cancel () {
                this.$emit('cancel');

                if (this.closeWhenCancel) {
                    this.close();
                }
            },
            // 点击遮罩层
            clickMask () {
                if (!this.force) {
                    this.cancel();
                }
            },
            close() {
                this.$emit('update:show', false);
            }
        }
     };
</script>

<template>
    <div v-show="show" :transition="transition">
        <div class="modal" tabindex="-1" @click.self="clickMask" ref="modal">
            <div class="modal-dialog" :class="modalClass" ref="dialog">
                <div class="modal-content" ref="content">
                    <!--Header-->
                    <div class="modal-header">
                        <slot name="header">
                            <h5 class="modal-title">
                                <slot name="title">
                                    {{title}}
                                </slot>
                            </h5>

                            <button type="button" class="close" aria-label="Close" @click="close">
                                <span aria-hidden="true">x</span>
                            </button>
                        </slot>
                    </div>

                    <!--Container-->
                    <div class="modal-body" :class="bodyClass">
                        <slot></slot>
                    </div>
                    <!--Footer-->
                    <div class="modal-footer">
                        <slot name="footer">
                            <button v-if="showCancelButton" type="button" :class="cancelClass" @click="cancel">{{cancelText}}</button>
                            <button v-if="showOkButton" type="button" :class="okClass" @click="ok">{{okText}}</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-backdrop show"></div>
    </div>
</template>

<style scoped>
    .modal {
        display: block;
    }
    .modal-transition {
        transition: all .6s ease;
    }
    .modal-leave {
        border-radius: 1px !important;
    }
    .modal-transition .modal-dialog, .modal-transition .modal-backdrop {
        transition: all .5s ease;
    }
    .modal-enter .modal-dialog, .modal-leave .modal-dialog {
        opacity: 0;
        transform: translateY(-30%);
    }
    .modal-enter .modal-backdrop, .modal-leave .modal-backdrop {
        opacity: 0;
    }

    .modal-dialog{
        top: -90px;
    }

    .modal-body{
        max-height: 80vh;
        overflow-y: auto;
    }

    @media (min-width: 992px) {
        .modal-md {
            max-width: 40%;
        }
    }
</style>
