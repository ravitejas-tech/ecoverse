export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
    graphql_public: {
        Tables: {
            [_ in never]: never
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            graphql: {
                Args: { extensions?: Json; operationName?: string; query?: string; variables?: Json }
                Returns: Json
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
    public: {
        Tables: {
            activity_log: {
                Row: {
                    action: string
                    actor_email: string | null
                    actor_id: string | null
                    changes: NonNullable<Json>
                    created_at: string
                    entity: string
                    entity_id: string | null
                    id: number
                }
                ComputedFields: never
                Insert: {
                    action: string
                    actor_email?: string | null
                    actor_id?: string | null
                    changes?: NonNullable<Json>
                    created_at?: string
                    entity: string
                    entity_id?: string | null
                    id?: never
                }
                Update: {
                    action?: string
                    actor_email?: string | null
                    actor_id?: string | null
                    changes?: NonNullable<Json>
                    created_at?: string
                    entity?: string
                    entity_id?: string | null
                    id?: never
                }
                Relationships: []
            }
            check_ins: {
                Row: {
                    created_at: string
                    event_id: string
                    id: number
                    result: Database['public']['Enums']['check_in_result']
                    scanned_value: string
                    staff_id: string | null
                    ticket_id: string | null
                }
                ComputedFields: never
                Insert: {
                    created_at?: string
                    event_id: string
                    id?: never
                    result: Database['public']['Enums']['check_in_result']
                    scanned_value: string
                    staff_id?: string | null
                    ticket_id?: string | null
                }
                Update: {
                    created_at?: string
                    event_id?: string
                    id?: never
                    result?: Database['public']['Enums']['check_in_result']
                    scanned_value?: string
                    staff_id?: string | null
                    ticket_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'check_ins_event_id_fkey'
                        columns: ['event_id']
                        isOneToOne: false
                        referencedRelation: 'events'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'check_ins_ticket_id_fkey'
                        columns: ['ticket_id']
                        isOneToOne: false
                        referencedRelation: 'tickets'
                        referencedColumns: ['id']
                    },
                ]
            }
            customers: {
                Row: {
                    city: string | null
                    consent_updated_at: string | null
                    created_at: string
                    email: string
                    id: string
                    marketing_consent: boolean
                    name: string
                    phone: string
                    updated_at: string
                }
                ComputedFields: never
                Insert: {
                    city?: string | null
                    consent_updated_at?: string | null
                    created_at?: string
                    email: string
                    id?: string
                    marketing_consent?: boolean
                    name: string
                    phone: string
                    updated_at?: string
                }
                Update: {
                    city?: string | null
                    consent_updated_at?: string | null
                    created_at?: string
                    email?: string
                    id?: string
                    marketing_consent?: boolean
                    name?: string
                    phone?: string
                    updated_at?: string
                }
                Relationships: []
            }
            events: {
                Row: {
                    age_limit: string
                    category: Database['public']['Enums']['event_category']
                    city: string
                    city_code: string
                    cover_alt: string
                    cover_credit: string | null
                    cover_source: string | null
                    cover_url: string | null
                    created_at: string
                    description: string
                    dress_code: string
                    ends_at: string
                    faqs: NonNullable<Json>
                    highlights: string[]
                    hosts: NonNullable<Json>
                    id: string
                    included: string[]
                    language: string
                    map_url: string | null
                    not_included: string[]
                    preview_token: string
                    published_at: string | null
                    questions: NonNullable<Json>
                    refund_policy: string
                    region: string
                    sales_paused: boolean
                    schedule: NonNullable<Json>
                    slug: string
                    starts_at: string
                    status: Database['public']['Enums']['event_status']
                    summary: string
                    tag: string
                    terms: string
                    things_to_know: string[]
                    title: string
                    tone: Database['public']['Enums']['pop_tone']
                    updated_at: string
                    venue_address: string
                    venue_lat: number | null
                    venue_lng: number | null
                    venue_name: string
                }
                ComputedFields: never
                Insert: {
                    age_limit?: string
                    category: Database['public']['Enums']['event_category']
                    city: string
                    city_code: string
                    cover_alt?: string
                    cover_credit?: string | null
                    cover_source?: string | null
                    cover_url?: string | null
                    created_at?: string
                    description?: string
                    dress_code?: string
                    ends_at: string
                    faqs?: NonNullable<Json>
                    highlights?: string[]
                    hosts?: NonNullable<Json>
                    id?: string
                    included?: string[]
                    language?: string
                    map_url?: string | null
                    not_included?: string[]
                    preview_token?: string
                    published_at?: string | null
                    questions?: NonNullable<Json>
                    refund_policy?: string
                    region?: string
                    sales_paused?: boolean
                    schedule?: NonNullable<Json>
                    slug: string
                    starts_at: string
                    status?: Database['public']['Enums']['event_status']
                    summary?: string
                    tag?: string
                    terms?: string
                    things_to_know?: string[]
                    title: string
                    tone?: Database['public']['Enums']['pop_tone']
                    updated_at?: string
                    venue_address?: string
                    venue_lat?: number | null
                    venue_lng?: number | null
                    venue_name?: string
                }
                Update: {
                    age_limit?: string
                    category?: Database['public']['Enums']['event_category']
                    city?: string
                    city_code?: string
                    cover_alt?: string
                    cover_credit?: string | null
                    cover_source?: string | null
                    cover_url?: string | null
                    created_at?: string
                    description?: string
                    dress_code?: string
                    ends_at?: string
                    faqs?: NonNullable<Json>
                    highlights?: string[]
                    hosts?: NonNullable<Json>
                    id?: string
                    included?: string[]
                    language?: string
                    map_url?: string | null
                    not_included?: string[]
                    preview_token?: string
                    published_at?: string | null
                    questions?: NonNullable<Json>
                    refund_policy?: string
                    region?: string
                    sales_paused?: boolean
                    schedule?: NonNullable<Json>
                    slug?: string
                    starts_at?: string
                    status?: Database['public']['Enums']['event_status']
                    summary?: string
                    tag?: string
                    terms?: string
                    things_to_know?: string[]
                    title?: string
                    tone?: Database['public']['Enums']['pop_tone']
                    updated_at?: string
                    venue_address?: string
                    venue_lat?: number | null
                    venue_lng?: number | null
                    venue_name?: string
                }
                Relationships: []
            }
            gallery_photos: {
                Row: {
                    alt: string
                    created_at: string
                    event_id: string
                    id: string
                    sort_order: number
                    url: string
                }
                ComputedFields: never
                Insert: {
                    alt?: string
                    created_at?: string
                    event_id: string
                    id?: string
                    sort_order?: number
                    url: string
                }
                Update: {
                    alt?: string
                    created_at?: string
                    event_id?: string
                    id?: string
                    sort_order?: number
                    url?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'gallery_photos_event_id_fkey'
                        columns: ['event_id']
                        isOneToOne: false
                        referencedRelation: 'events'
                        referencedColumns: ['id']
                    },
                ]
            }
            order_items: {
                Row: {
                    admits: number
                    id: string
                    order_id: string
                    quantity: number
                    ticket_type_id: string
                    unit_price: number
                }
                ComputedFields: never
                Insert: {
                    admits: number
                    id?: string
                    order_id: string
                    quantity: number
                    ticket_type_id: string
                    unit_price: number
                }
                Update: {
                    admits?: number
                    id?: string
                    order_id?: string
                    quantity?: number
                    ticket_type_id?: string
                    unit_price?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'order_items_order_id_fkey'
                        columns: ['order_id']
                        isOneToOne: false
                        referencedRelation: 'orders'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'order_items_ticket_type_id_fkey'
                        columns: ['ticket_type_id']
                        isOneToOne: false
                        referencedRelation: 'ticket_types'
                        referencedColumns: ['id']
                    },
                ]
            }
            orders: {
                Row: {
                    access_token: string
                    answers: NonNullable<Json>
                    booking_code: string
                    cancelled_at: string | null
                    created_at: string
                    customer_id: string
                    discount: number
                    email: string
                    event_id: string
                    hold_expires_at: string | null
                    id: string
                    name: string
                    needs_refund: boolean
                    notes: string
                    paid_at: string | null
                    payment_provider: string | null
                    phone: string
                    promo_code_id: string | null
                    provider_order_id: string | null
                    provider_payment_id: string | null
                    provider_refund_id: string | null
                    referrer: string | null
                    refund_amount: number | null
                    refunded_at: string | null
                    source: Database['public']['Enums']['order_source']
                    status: Database['public']['Enums']['order_status']
                    subtotal: number
                    terms_accepted_at: string | null
                    total: number
                    updated_at: string
                    utm_campaign: string | null
                    utm_medium: string | null
                    utm_source: string | null
                }
                ComputedFields: never
                Insert: {
                    access_token?: string
                    answers?: NonNullable<Json>
                    booking_code: string
                    cancelled_at?: string | null
                    created_at?: string
                    customer_id: string
                    discount?: number
                    email: string
                    event_id: string
                    hold_expires_at?: string | null
                    id?: string
                    name: string
                    needs_refund?: boolean
                    notes?: string
                    paid_at?: string | null
                    payment_provider?: string | null
                    phone: string
                    promo_code_id?: string | null
                    provider_order_id?: string | null
                    provider_payment_id?: string | null
                    provider_refund_id?: string | null
                    referrer?: string | null
                    refund_amount?: number | null
                    refunded_at?: string | null
                    source?: Database['public']['Enums']['order_source']
                    status?: Database['public']['Enums']['order_status']
                    subtotal: number
                    terms_accepted_at?: string | null
                    total: number
                    updated_at?: string
                    utm_campaign?: string | null
                    utm_medium?: string | null
                    utm_source?: string | null
                }
                Update: {
                    access_token?: string
                    answers?: NonNullable<Json>
                    booking_code?: string
                    cancelled_at?: string | null
                    created_at?: string
                    customer_id?: string
                    discount?: number
                    email?: string
                    event_id?: string
                    hold_expires_at?: string | null
                    id?: string
                    name?: string
                    needs_refund?: boolean
                    notes?: string
                    paid_at?: string | null
                    payment_provider?: string | null
                    phone?: string
                    promo_code_id?: string | null
                    provider_order_id?: string | null
                    provider_payment_id?: string | null
                    provider_refund_id?: string | null
                    referrer?: string | null
                    refund_amount?: number | null
                    refunded_at?: string | null
                    source?: Database['public']['Enums']['order_source']
                    status?: Database['public']['Enums']['order_status']
                    subtotal?: number
                    terms_accepted_at?: string | null
                    total?: number
                    updated_at?: string
                    utm_campaign?: string | null
                    utm_medium?: string | null
                    utm_source?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'orders_customer_id_fkey'
                        columns: ['customer_id']
                        isOneToOne: false
                        referencedRelation: 'customers'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'orders_event_id_fkey'
                        columns: ['event_id']
                        isOneToOne: false
                        referencedRelation: 'events'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'orders_promo_code_id_fkey'
                        columns: ['promo_code_id']
                        isOneToOne: false
                        referencedRelation: 'promo_codes'
                        referencedColumns: ['id']
                    },
                ]
            }
            page_visits: {
                Row: {
                    created_at: string
                    event_id: string | null
                    id: number
                    path: string
                    referrer: string | null
                    utm_campaign: string | null
                    utm_medium: string | null
                    utm_source: string | null
                    visitor_id: string
                }
                ComputedFields: never
                Insert: {
                    created_at?: string
                    event_id?: string | null
                    id?: never
                    path: string
                    referrer?: string | null
                    utm_campaign?: string | null
                    utm_medium?: string | null
                    utm_source?: string | null
                    visitor_id: string
                }
                Update: {
                    created_at?: string
                    event_id?: string | null
                    id?: never
                    path?: string
                    referrer?: string | null
                    utm_campaign?: string | null
                    utm_medium?: string | null
                    utm_source?: string | null
                    visitor_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'page_visits_event_id_fkey'
                        columns: ['event_id']
                        isOneToOne: false
                        referencedRelation: 'events'
                        referencedColumns: ['id']
                    },
                ]
            }
            promo_codes: {
                Row: {
                    active: boolean
                    code: string
                    created_at: string
                    discount_type: Database['public']['Enums']['discount_type']
                    discount_value: number
                    event_id: string | null
                    expires_at: string | null
                    id: string
                    label: string
                    max_uses: number | null
                    starts_at: string | null
                    updated_at: string
                }
                ComputedFields: never
                Insert: {
                    active?: boolean
                    code: string
                    created_at?: string
                    discount_type: Database['public']['Enums']['discount_type']
                    discount_value: number
                    event_id?: string | null
                    expires_at?: string | null
                    id?: string
                    label?: string
                    max_uses?: number | null
                    starts_at?: string | null
                    updated_at?: string
                }
                Update: {
                    active?: boolean
                    code?: string
                    created_at?: string
                    discount_type?: Database['public']['Enums']['discount_type']
                    discount_value?: number
                    event_id?: string | null
                    expires_at?: string | null
                    id?: string
                    label?: string
                    max_uses?: number | null
                    starts_at?: string | null
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'promo_codes_event_id_fkey'
                        columns: ['event_id']
                        isOneToOne: false
                        referencedRelation: 'events'
                        referencedColumns: ['id']
                    },
                ]
            }
            staff: {
                Row: {
                    active: boolean
                    created_at: string
                    email: string
                    name: string
                    role: Database['public']['Enums']['staff_role']
                    updated_at: string
                    user_id: string
                }
                ComputedFields: never
                Insert: {
                    active?: boolean
                    created_at?: string
                    email: string
                    name: string
                    role: Database['public']['Enums']['staff_role']
                    updated_at?: string
                    user_id: string
                }
                Update: {
                    active?: boolean
                    created_at?: string
                    email?: string
                    name?: string
                    role?: Database['public']['Enums']['staff_role']
                    updated_at?: string
                    user_id?: string
                }
                Relationships: []
            }
            ticket_types: {
                Row: {
                    admits: number
                    created_at: string
                    description: string
                    event_id: string
                    id: string
                    max_per_order: number
                    min_per_order: number
                    name: string
                    price: number
                    quantity: number
                    sales_end: string | null
                    sales_start: string | null
                    sold_out: boolean
                    sort_order: number
                    updated_at: string
                    visible: boolean
                }
                ComputedFields: never
                Insert: {
                    admits?: number
                    created_at?: string
                    description?: string
                    event_id: string
                    id?: string
                    max_per_order?: number
                    min_per_order?: number
                    name: string
                    price: number
                    quantity: number
                    sales_end?: string | null
                    sales_start?: string | null
                    sold_out?: boolean
                    sort_order?: number
                    updated_at?: string
                    visible?: boolean
                }
                Update: {
                    admits?: number
                    created_at?: string
                    description?: string
                    event_id?: string
                    id?: string
                    max_per_order?: number
                    min_per_order?: number
                    name?: string
                    price?: number
                    quantity?: number
                    sales_end?: string | null
                    sales_start?: string | null
                    sold_out?: boolean
                    sort_order?: number
                    updated_at?: string
                    visible?: boolean
                }
                Relationships: [
                    {
                        foreignKeyName: 'ticket_types_event_id_fkey'
                        columns: ['event_id']
                        isOneToOne: false
                        referencedRelation: 'events'
                        referencedColumns: ['id']
                    },
                ]
            }
            tickets: {
                Row: {
                    checked_in_at: string | null
                    checked_in_by: string | null
                    code: string
                    created_at: string
                    event_id: string
                    id: string
                    order_id: string
                    qr_token: string
                    status: Database['public']['Enums']['ticket_status']
                    ticket_type_id: string
                }
                ComputedFields: never
                Insert: {
                    checked_in_at?: string | null
                    checked_in_by?: string | null
                    code: string
                    created_at?: string
                    event_id: string
                    id?: string
                    order_id: string
                    qr_token?: string
                    status?: Database['public']['Enums']['ticket_status']
                    ticket_type_id: string
                }
                Update: {
                    checked_in_at?: string | null
                    checked_in_by?: string | null
                    code?: string
                    created_at?: string
                    event_id?: string
                    id?: string
                    order_id?: string
                    qr_token?: string
                    status?: Database['public']['Enums']['ticket_status']
                    ticket_type_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'tickets_event_id_fkey'
                        columns: ['event_id']
                        isOneToOne: false
                        referencedRelation: 'events'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'tickets_order_id_fkey'
                        columns: ['order_id']
                        isOneToOne: false
                        referencedRelation: 'orders'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'tickets_ticket_type_id_fkey'
                        columns: ['ticket_type_id']
                        isOneToOne: false
                        referencedRelation: 'ticket_types'
                        referencedColumns: ['id']
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            apply_promo: {
                Args: { p_code: string; p_event_id: string; p_lock?: boolean; p_subtotal: number }
                Returns: {
                    discount_amount: number
                    promo_code: string
                    promo_id: string
                }[]
            }
            assert_hold_allowed: { Args: { p_email: string }; Returns: undefined }
            cancel_order: {
                Args: { p_order_id: string; p_reason?: string }
                Returns: {
                    access_token: string
                    answers: NonNullable<Json>
                    booking_code: string
                    cancelled_at: string | null
                    created_at: string
                    customer_id: string
                    discount: number
                    email: string
                    event_id: string
                    hold_expires_at: string | null
                    id: string
                    name: string
                    needs_refund: boolean
                    notes: string
                    paid_at: string | null
                    payment_provider: string | null
                    phone: string
                    promo_code_id: string | null
                    provider_order_id: string | null
                    provider_payment_id: string | null
                    provider_refund_id: string | null
                    referrer: string | null
                    refund_amount: number | null
                    refunded_at: string | null
                    source: Database['public']['Enums']['order_source']
                    status: Database['public']['Enums']['order_status']
                    subtotal: number
                    terms_accepted_at: string | null
                    total: number
                    updated_at: string
                    utm_campaign: string | null
                    utm_medium: string | null
                    utm_source: string | null
                }
                SetofOptions: {
                    from: '*'
                    to: 'orders'
                    isOneToOne: true
                    isSetofReturn: false
                }
            }
            check_in: { Args: { p_event_id: string; p_override?: boolean; p_value: string }; Returns: Json }
            check_in_stats: {
                Args: { p_event_id: string }
                Returns: {
                    checked_in: number
                    valid_tickets: number
                }[]
            }
            community_members: {
                Args: Record<PropertyKey, never>
                Returns: {
                    city: string
                    email: string
                    events_attended: number
                    events_booked: number
                    first_booked_at: string
                    has_upcoming: boolean
                    id: string
                    is_new: boolean
                    is_regular: boolean
                    last_booked_at: string
                    last_event_at: string
                    last_event_title: string
                    marketing_consent: boolean
                    name: string
                    next_event_at: string
                    next_event_title: string
                    phone: string
                    tickets: number
                    total_spent: number
                }[]
            }
            community_stats: {
                Args: Record<PropertyKey, never>
                Returns: {
                    new_members: number
                    past: number
                    regulars: number
                    total: number
                    upcoming: number
                    updates_ok: number
                }[]
            }
            confirm_order: {
                Args: { p_amount_paise: number; p_order_id: string; p_payment_id: string; p_provider: string }
                Returns: {
                    access_token: string
                    answers: NonNullable<Json>
                    booking_code: string
                    cancelled_at: string | null
                    created_at: string
                    customer_id: string
                    discount: number
                    email: string
                    event_id: string
                    hold_expires_at: string | null
                    id: string
                    name: string
                    needs_refund: boolean
                    notes: string
                    paid_at: string | null
                    payment_provider: string | null
                    phone: string
                    promo_code_id: string | null
                    provider_order_id: string | null
                    provider_payment_id: string | null
                    provider_refund_id: string | null
                    referrer: string | null
                    refund_amount: number | null
                    refunded_at: string | null
                    source: Database['public']['Enums']['order_source']
                    status: Database['public']['Enums']['order_status']
                    subtotal: number
                    terms_accepted_at: string | null
                    total: number
                    updated_at: string
                    utm_campaign: string | null
                    utm_medium: string | null
                    utm_source: string | null
                }
                SetofOptions: {
                    from: '*'
                    to: 'orders'
                    isOneToOne: true
                    isSetofReturn: false
                }
            }
            current_email: { Args: Record<PropertyKey, never>; Returns: string }
            current_staff_role: { Args: Record<PropertyKey, never>; Returns: Database['public']['Enums']['staff_role'] }
            dashboard_stats: { Args: { p_event_id?: string }; Returns: Json }
            duplicate_event: { Args: { p_event_id: string }; Returns: string }
            event_summaries: {
                Args: Record<PropertyKey, never>
                Returns: {
                    capacity: number
                    checked_in: number
                    event_id: string
                    gross_sales: number
                    remaining: number
                    tickets_sold: number
                }[]
            }
            expire_stale_orders: { Args: Record<PropertyKey, never>; Returns: undefined }
            generate_booking_code: { Args: { p_city_code: string; p_starts_at: string }; Returns: string }
            get_booking: { Args: { p_access_token: string }; Returns: Json }
            get_event_preview: {
                Args: { p_preview_token: string; p_slug: string }
                Returns: {
                    age_limit: string
                    category: Database['public']['Enums']['event_category']
                    city: string
                    city_code: string
                    cover_alt: string
                    cover_credit: string | null
                    cover_source: string | null
                    cover_url: string | null
                    created_at: string
                    description: string
                    dress_code: string
                    ends_at: string
                    faqs: NonNullable<Json>
                    highlights: string[]
                    hosts: NonNullable<Json>
                    id: string
                    included: string[]
                    language: string
                    map_url: string | null
                    not_included: string[]
                    preview_token: string
                    published_at: string | null
                    questions: NonNullable<Json>
                    refund_policy: string
                    region: string
                    sales_paused: boolean
                    schedule: NonNullable<Json>
                    slug: string
                    starts_at: string
                    status: Database['public']['Enums']['event_status']
                    summary: string
                    tag: string
                    terms: string
                    things_to_know: string[]
                    title: string
                    tone: Database['public']['Enums']['pop_tone']
                    updated_at: string
                    venue_address: string
                    venue_lat: number | null
                    venue_lng: number | null
                    venue_name: string
                }[]
                SetofOptions: {
                    from: '*'
                    to: 'events'
                    isOneToOne: false
                    isSetofReturn: true
                }
            }
            get_event_preview_ticket_types: {
                Args: { p_preview_token: string; p_slug: string }
                Returns: {
                    admits: number
                    created_at: string
                    description: string
                    event_id: string
                    id: string
                    max_per_order: number
                    min_per_order: number
                    name: string
                    price: number
                    quantity: number
                    sales_end: string | null
                    sales_start: string | null
                    sold_out: boolean
                    sort_order: number
                    updated_at: string
                    visible: boolean
                }[]
                SetofOptions: {
                    from: '*'
                    to: 'ticket_types'
                    isOneToOne: false
                    isSetofReturn: true
                }
            }
            has_staff_role: { Args: { roles: Database['public']['Enums']['staff_role'][] }; Returns: boolean }
            is_staff: { Args: Record<PropertyKey, never>; Returns: boolean }
            issue_complimentary: {
                Args: {
                    p_email: string
                    p_event_id: string
                    p_name: string
                    p_note?: string
                    p_phone: string
                    p_quantity: number
                    p_ticket_type_id: string
                }
                Returns: {
                    access_token: string
                    answers: NonNullable<Json>
                    booking_code: string
                    cancelled_at: string | null
                    created_at: string
                    customer_id: string
                    discount: number
                    email: string
                    event_id: string
                    hold_expires_at: string | null
                    id: string
                    name: string
                    needs_refund: boolean
                    notes: string
                    paid_at: string | null
                    payment_provider: string | null
                    phone: string
                    promo_code_id: string | null
                    provider_order_id: string | null
                    provider_payment_id: string | null
                    provider_refund_id: string | null
                    referrer: string | null
                    refund_amount: number | null
                    refunded_at: string | null
                    source: Database['public']['Enums']['order_source']
                    status: Database['public']['Enums']['order_status']
                    subtotal: number
                    terms_accepted_at: string | null
                    total: number
                    updated_at: string
                    utm_campaign: string | null
                    utm_medium: string | null
                    utm_source: string | null
                }
                SetofOptions: {
                    from: '*'
                    to: 'orders'
                    isOneToOne: true
                    isSetofReturn: false
                }
            }
            issue_tickets: { Args: { p_order_id: string }; Returns: undefined }
            mark_order_refunded: {
                Args: {
                    p_actor_email: string
                    p_actor_id: string
                    p_amount: number
                    p_order_id: string
                    p_reason?: string
                    p_refund_id: string
                }
                Returns: {
                    access_token: string
                    answers: NonNullable<Json>
                    booking_code: string
                    cancelled_at: string | null
                    created_at: string
                    customer_id: string
                    discount: number
                    email: string
                    event_id: string
                    hold_expires_at: string | null
                    id: string
                    name: string
                    needs_refund: boolean
                    notes: string
                    paid_at: string | null
                    payment_provider: string | null
                    phone: string
                    promo_code_id: string | null
                    provider_order_id: string | null
                    provider_payment_id: string | null
                    provider_refund_id: string | null
                    referrer: string | null
                    refund_amount: number | null
                    refunded_at: string | null
                    source: Database['public']['Enums']['order_source']
                    status: Database['public']['Enums']['order_status']
                    subtotal: number
                    terms_accepted_at: string | null
                    total: number
                    updated_at: string
                    utm_campaign: string | null
                    utm_medium: string | null
                    utm_source: string | null
                }
                SetofOptions: {
                    from: '*'
                    to: 'orders'
                    isOneToOne: true
                    isSetofReturn: false
                }
            }
            promo_code_summaries: {
                Args: Record<PropertyKey, never>
                Returns: {
                    discount_total: number
                    promo_code_id: string
                    revenue: number
                    uses: number
                }[]
            }
            promo_code_uses: { Args: { p_promo_code_id: string }; Returns: number }
            quote_promo: {
                Args: { p_code: string; p_event_id: string; p_subtotal: number }
                Returns: {
                    code: string
                    discount: number
                }[]
            }
            reserve_order: {
                Args: {
                    p_answers?: Json
                    p_email: string
                    p_event_id: string
                    p_hold_minutes?: number
                    p_items: Json
                    p_marketing_consent?: boolean
                    p_name: string
                    p_phone: string
                    p_promo_code?: string
                    p_utm?: Json
                }
                Returns: {
                    access_token: string
                    answers: NonNullable<Json>
                    booking_code: string
                    cancelled_at: string | null
                    created_at: string
                    customer_id: string
                    discount: number
                    email: string
                    event_id: string
                    hold_expires_at: string | null
                    id: string
                    name: string
                    needs_refund: boolean
                    notes: string
                    paid_at: string | null
                    payment_provider: string | null
                    phone: string
                    promo_code_id: string | null
                    provider_order_id: string | null
                    provider_payment_id: string | null
                    provider_refund_id: string | null
                    referrer: string | null
                    refund_amount: number | null
                    refunded_at: string | null
                    source: Database['public']['Enums']['order_source']
                    status: Database['public']['Enums']['order_status']
                    subtotal: number
                    terms_accepted_at: string | null
                    total: number
                    updated_at: string
                    utm_campaign: string | null
                    utm_medium: string | null
                    utm_source: string | null
                }
                SetofOptions: {
                    from: '*'
                    to: 'orders'
                    isOneToOne: true
                    isSetofReturn: false
                }
            }
            ticket_availability: {
                Args: { p_event_ids: string[] }
                Returns: {
                    event_id: string
                    remaining: number
                    ticket_type_id: string
                }[]
            }
            ticket_type_remaining: { Args: { p_ticket_type_id: string }; Returns: number }
            track_visit: {
                Args: { p_event_id?: string; p_path: string; p_referrer?: string; p_utm?: Json; p_visitor_id: string }
                Returns: undefined
            }
            upsert_customer: {
                Args: { p_city: string; p_email: string; p_marketing_consent: boolean; p_name: string; p_phone: string }
                Returns: string
            }
            validate_buyer: { Args: { p_email: string; p_name: string; p_phone: string }; Returns: undefined }
        }
        Enums: {
            check_in_result: 'valid' | 'already_checked_in' | 'invalid' | 'cancelled' | 'wrong_event' | 'override'
            discount_type: 'percent' | 'fixed'
            event_category: 'dance_night' | 'social_mixer' | 'workshop' | 'weekend_trip' | 'nightlife' | 'meetup'
            event_status: 'draft' | 'published'
            order_source: 'online' | 'complimentary'
            order_status: 'pending' | 'paid' | 'expired' | 'failed' | 'cancelled' | 'refunded'
            pop_tone: 'pink' | 'yellow' | 'cyan' | 'lime' | 'violet' | 'orange'
            staff_role: 'super_admin' | 'event_manager' | 'finance' | 'marketing' | 'gate_staff' | 'viewer'
            ticket_status: 'valid' | 'cancelled'
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
        keyof (DefaultSchema['Tables'] & DefaultSchema['Views']) | { schema: keyof DatabaseWithoutInternals },
    TableName extends (DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
              DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
        : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
          DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
      ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R
        }
          ? R
          : never
      : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
    TableName extends (DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
        : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
      ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
            Insert: infer I
        }
          ? I
          : never
      : never

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
    TableName extends (DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
        : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
      ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
            Update: infer U
        }
          ? U
          : never
      : never

export type Enums<
    DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
    EnumName extends (DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
        : never) = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
      ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
      : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        keyof DefaultSchema['CompositeTypes'] | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
        : never) = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
      ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
      : never

export const Constants = {
    graphql_public: {
        Enums: {},
    },
    public: {
        Enums: {
            check_in_result: ['valid', 'already_checked_in', 'invalid', 'cancelled', 'wrong_event', 'override'],
            discount_type: ['percent', 'fixed'],
            event_category: ['dance_night', 'social_mixer', 'workshop', 'weekend_trip', 'nightlife', 'meetup'],
            event_status: ['draft', 'published'],
            order_source: ['online', 'complimentary'],
            order_status: ['pending', 'paid', 'expired', 'failed', 'cancelled', 'refunded'],
            pop_tone: ['pink', 'yellow', 'cyan', 'lime', 'violet', 'orange'],
            staff_role: ['super_admin', 'event_manager', 'finance', 'marketing', 'gate_staff', 'viewer'],
            ticket_status: ['valid', 'cancelled'],
        },
    },
} as const
