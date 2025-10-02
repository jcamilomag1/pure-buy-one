export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      botgoing_embeddings: {
        Row: {
          content: string | null
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      carrito_compras: {
        Row: {
          fecha_agregado: string | null
          id: string
          propiedad_id: string
          usuario_id: string
        }
        Insert: {
          fecha_agregado?: string | null
          id?: string
          propiedad_id: string
          usuario_id: string
        }
        Update: {
          fecha_agregado?: string | null
          id?: string
          propiedad_id?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carrito_compras_propiedad_id_fkey"
            columns: ["propiedad_id"]
            isOneToOne: false
            referencedRelation: "propiedades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carrito_compras_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          messages: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          messages?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          messages?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "clase_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_rankings"
            referencedColumns: ["user_id"]
          },
        ]
      }
      citas: {
        Row: {
          estado: string | null
          fecha: string
          hora: string
          id: string
          propiedad_id: string | null
          usuario_id: string | null
        }
        Insert: {
          estado?: string | null
          fecha: string
          hora: string
          id?: string
          propiedad_id?: string | null
          usuario_id?: string | null
        }
        Update: {
          estado?: string | null
          fecha?: string
          hora?: string
          id?: string
          propiedad_id?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "citas_propiedad_id_fkey"
            columns: ["propiedad_id"]
            isOneToOne: false
            referencedRelation: "propiedades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "citas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      clase_options: {
        Row: {
          created_at: string | null
          id: string
          label: string
          meta_tag: string | null
          question_id: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          label: string
          meta_tag?: string | null
          question_id?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string
          meta_tag?: string | null
          question_id?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "clase_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "clase_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      clase_questions: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          number: number
          question_text: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          number: number
          question_text: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          number?: number
          question_text?: string
        }
        Relationships: []
      }
      clase_responses: {
        Row: {
          created_at: string | null
          id: string
          option_id: string | null
          question_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          option_id?: string | null
          question_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          option_id?: string | null
          question_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clase_responses_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "clase_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clase_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "clase_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clase_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "clase_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clase_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_rankings"
            referencedColumns: ["user_id"]
          },
        ]
      }
      clase_results: {
        Row: {
          created_at: string | null
          description: string
          hero_name: string
          id: string
          recommendations: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          hero_name: string
          id?: string
          recommendations?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          hero_name?: string
          id?: string
          recommendations?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clase_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "clase_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clase_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_rankings"
            referencedColumns: ["user_id"]
          },
        ]
      }
      clase_users: {
        Row: {
          created_at: string | null
          email: string
          gender: string | null
          id: string
          name: string | null
          whatsapp: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          gender?: string | null
          id?: string
          name?: string | null
          whatsapp?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          gender?: string | null
          id?: string
          name?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      cotizaciones: {
        Row: {
          configuracion: Json
          created_at: string | null
          desglose_precios: Json
          email_cliente: string
          estado: string | null
          fecha_expiracion: string | null
          id: string
          nombre_cliente: string | null
          notas_cliente: string | null
          opcion_presupuesto_id: string | null
          precio_total: number
          proyecto_id: string
          telefono_cliente: string | null
          updated_at: string | null
        }
        Insert: {
          configuracion: Json
          created_at?: string | null
          desglose_precios: Json
          email_cliente: string
          estado?: string | null
          fecha_expiracion?: string | null
          id?: string
          nombre_cliente?: string | null
          notas_cliente?: string | null
          opcion_presupuesto_id?: string | null
          precio_total: number
          proyecto_id: string
          telefono_cliente?: string | null
          updated_at?: string | null
        }
        Update: {
          configuracion?: Json
          created_at?: string | null
          desglose_precios?: Json
          email_cliente?: string
          estado?: string | null
          fecha_expiracion?: string | null
          id?: string
          nombre_cliente?: string | null
          notas_cliente?: string | null
          opcion_presupuesto_id?: string | null
          precio_total?: number
          proyecto_id?: string
          telefono_cliente?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cotizaciones_opcion_presupuesto_id_fkey"
            columns: ["opcion_presupuesto_id"]
            isOneToOne: false
            referencedRelation: "propuestas_opciones_presupuesto"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cotizaciones_proyecto_id_fkey"
            columns: ["proyecto_id"]
            isOneToOne: false
            referencedRelation: "proyectos_clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      cotizaciones_historial: {
        Row: {
          configuracion: Json
          cotizacion_id: string
          created_at: string | null
          desglose_precios: Json
          id: string
          precio_total: number
        }
        Insert: {
          configuracion: Json
          cotizacion_id: string
          created_at?: string | null
          desglose_precios: Json
          id?: string
          precio_total: number
        }
        Update: {
          configuracion?: Json
          cotizacion_id?: string
          created_at?: string | null
          desglose_precios?: Json
          id?: string
          precio_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "cotizaciones_historial_cotizacion_id_fkey"
            columns: ["cotizacion_id"]
            isOneToOne: false
            referencedRelation: "cotizaciones"
            referencedColumns: ["id"]
          },
        ]
      }
      documentos: {
        Row: {
          fecha_carga: string | null
          id: string
          tipo: string | null
          url: string
          usuario_id: string | null
        }
        Insert: {
          fecha_carga?: string | null
          id?: string
          tipo?: string | null
          url: string
          usuario_id?: string | null
        }
        Update: {
          fecha_carga?: string | null
          id?: string
          tipo?: string | null
          url?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documentos_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      favoritos: {
        Row: {
          created_at: string | null
          id: string
          propiedad_id: string | null
          usuario_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          propiedad_id?: string | null
          usuario_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          propiedad_id?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favoritos_propiedad_id_fkey"
            columns: ["propiedad_id"]
            isOneToOne: false
            referencedRelation: "propiedades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favoritos_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      notificaciones: {
        Row: {
          fecha: string | null
          id: string
          leido: boolean | null
          mensaje: string | null
          tipo: string | null
          usuario_id: string
        }
        Insert: {
          fecha?: string | null
          id?: string
          leido?: boolean | null
          mensaje?: string | null
          tipo?: string | null
          usuario_id: string
        }
        Update: {
          fecha?: string | null
          id?: string
          leido?: boolean | null
          mensaje?: string | null
          tipo?: string | null
          usuario_id?: string
        }
        Relationships: []
      }
      pareja_analisis_premios: {
        Row: {
          codigo_pareja: string
          id: string
          premio_maximo: number | null
          premio_minimo: number | null
          premios_emocionales: number | null
          premios_materiales: number | null
          promedio_puntos: number | null
          total_premios: number | null
          ultima_actualizacion: string | null
        }
        Insert: {
          codigo_pareja: string
          id?: string
          premio_maximo?: number | null
          premio_minimo?: number | null
          premios_emocionales?: number | null
          premios_materiales?: number | null
          promedio_puntos?: number | null
          total_premios?: number | null
          ultima_actualizacion?: string | null
        }
        Update: {
          codigo_pareja?: string
          id?: string
          premio_maximo?: number | null
          premio_minimo?: number | null
          premios_emocionales?: number | null
          premios_materiales?: number | null
          promedio_puntos?: number | null
          total_premios?: number | null
          ultima_actualizacion?: string | null
        }
        Relationships: []
      }
      pareja_analisis_puntos: {
        Row: {
          codigo_pareja: string
          fecha_ultimo_punto: string | null
          id: string
          porcentaje_aceptacion: number | null
          promedio_puntos_negativos: number | null
          promedio_puntos_positivos: number | null
          total_negativos: number | null
          total_positivos: number | null
          total_propuestos: number | null
          ultima_actualizacion: string | null
        }
        Insert: {
          codigo_pareja: string
          fecha_ultimo_punto?: string | null
          id?: string
          porcentaje_aceptacion?: number | null
          promedio_puntos_negativos?: number | null
          promedio_puntos_positivos?: number | null
          total_negativos?: number | null
          total_positivos?: number | null
          total_propuestos?: number | null
          ultima_actualizacion?: string | null
        }
        Update: {
          codigo_pareja?: string
          fecha_ultimo_punto?: string | null
          id?: string
          porcentaje_aceptacion?: number | null
          promedio_puntos_negativos?: number | null
          promedio_puntos_positivos?: number | null
          total_negativos?: number | null
          total_positivos?: number | null
          total_propuestos?: number | null
          ultima_actualizacion?: string | null
        }
        Relationships: []
      }
      pareja_canjes: {
        Row: {
          estado: string | null
          fecha: string | null
          id: string
          premio_id: string | null
          usuario_id: string | null
        }
        Insert: {
          estado?: string | null
          fecha?: string | null
          id?: string
          premio_id?: string | null
          usuario_id?: string | null
        }
        Update: {
          estado?: string | null
          fecha?: string | null
          id?: string
          premio_id?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pareja_canjes_premio_id_fkey"
            columns: ["premio_id"]
            isOneToOne: false
            referencedRelation: "pareja_premios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pareja_canjes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "parea_vista_puntos_disponibles"
            referencedColumns: ["usuario_id"]
          },
          {
            foreignKeyName: "pareja_canjes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "pareja_usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pareja_canjes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "pareja_vista_ranking_pareja"
            referencedColumns: ["usuario_id"]
          },
          {
            foreignKeyName: "pareja_canjes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "vista_historial_canjes"
            referencedColumns: ["usuario_id"]
          },
        ]
      }
      pareja_etiquetas_ia: {
        Row: {
          codigo_pareja: string
          etiqueta: string | null
          fecha: string | null
          fuente: string | null
          id: string
        }
        Insert: {
          codigo_pareja: string
          etiqueta?: string | null
          fecha?: string | null
          fuente?: string | null
          id?: string
        }
        Update: {
          codigo_pareja?: string
          etiqueta?: string | null
          fecha?: string | null
          fuente?: string | null
          id?: string
        }
        Relationships: []
      }
      pareja_perfil_ia: {
        Row: {
          codigo_pareja: string
          comodidad_verdades: boolean | null
          comportamiento_premios: Json | null
          comportamiento_puntos: Json | null
          desea_sugerencias: boolean | null
          facilidad_comunicacion: number | null
          fecha_activacion: string | null
          forma_reconocimiento: string | null
          frecuencia_convivencia: string | null
          frecuencia_sugerencias: string | null
          generador_tensiones: string | null
          gusto_retos: number | null
          id: string
          mayor_fortaleza: string | null
          mayor_reto: string | null
          motivacion: string | null
          motivo_app: string | null
          objetivo_app: string | null
          plan_favorito: string | null
          tiempo_juntos: string | null
          tipo_relacion: string | null
        }
        Insert: {
          codigo_pareja: string
          comodidad_verdades?: boolean | null
          comportamiento_premios?: Json | null
          comportamiento_puntos?: Json | null
          desea_sugerencias?: boolean | null
          facilidad_comunicacion?: number | null
          fecha_activacion?: string | null
          forma_reconocimiento?: string | null
          frecuencia_convivencia?: string | null
          frecuencia_sugerencias?: string | null
          generador_tensiones?: string | null
          gusto_retos?: number | null
          id?: string
          mayor_fortaleza?: string | null
          mayor_reto?: string | null
          motivacion?: string | null
          motivo_app?: string | null
          objetivo_app?: string | null
          plan_favorito?: string | null
          tiempo_juntos?: string | null
          tipo_relacion?: string | null
        }
        Update: {
          codigo_pareja?: string
          comodidad_verdades?: boolean | null
          comportamiento_premios?: Json | null
          comportamiento_puntos?: Json | null
          desea_sugerencias?: boolean | null
          facilidad_comunicacion?: number | null
          fecha_activacion?: string | null
          forma_reconocimiento?: string | null
          frecuencia_convivencia?: string | null
          frecuencia_sugerencias?: string | null
          generador_tensiones?: string | null
          gusto_retos?: number | null
          id?: string
          mayor_fortaleza?: string | null
          mayor_reto?: string | null
          motivacion?: string | null
          motivo_app?: string | null
          objetivo_app?: string | null
          plan_favorito?: string | null
          tiempo_juntos?: string | null
          tipo_relacion?: string | null
        }
        Relationships: []
      }
      pareja_premios: {
        Row: {
          codigo_pareja: string
          costo_puntos: number
          descripcion: string | null
          id: string
          nombre: string
        }
        Insert: {
          codigo_pareja: string
          costo_puntos: number
          descripcion?: string | null
          id?: string
          nombre: string
        }
        Update: {
          codigo_pareja?: string
          costo_puntos?: number
          descripcion?: string | null
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      pareja_puntos: {
        Row: {
          cantidad: number
          comentario_respuesta: string | null
          estado: string | null
          fecha_creacion: string | null
          id: string
          motivo: string
          para_quien_id: string | null
          quien_propone_id: string | null
        }
        Insert: {
          cantidad: number
          comentario_respuesta?: string | null
          estado?: string | null
          fecha_creacion?: string | null
          id?: string
          motivo: string
          para_quien_id?: string | null
          quien_propone_id?: string | null
        }
        Update: {
          cantidad?: number
          comentario_respuesta?: string | null
          estado?: string | null
          fecha_creacion?: string | null
          id?: string
          motivo?: string
          para_quien_id?: string | null
          quien_propone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pareja_puntos_para_quien_id_fkey"
            columns: ["para_quien_id"]
            isOneToOne: false
            referencedRelation: "parea_vista_puntos_disponibles"
            referencedColumns: ["usuario_id"]
          },
          {
            foreignKeyName: "pareja_puntos_para_quien_id_fkey"
            columns: ["para_quien_id"]
            isOneToOne: false
            referencedRelation: "pareja_usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pareja_puntos_para_quien_id_fkey"
            columns: ["para_quien_id"]
            isOneToOne: false
            referencedRelation: "pareja_vista_ranking_pareja"
            referencedColumns: ["usuario_id"]
          },
          {
            foreignKeyName: "pareja_puntos_para_quien_id_fkey"
            columns: ["para_quien_id"]
            isOneToOne: false
            referencedRelation: "vista_historial_canjes"
            referencedColumns: ["usuario_id"]
          },
          {
            foreignKeyName: "pareja_puntos_quien_propone_id_fkey"
            columns: ["quien_propone_id"]
            isOneToOne: false
            referencedRelation: "parea_vista_puntos_disponibles"
            referencedColumns: ["usuario_id"]
          },
          {
            foreignKeyName: "pareja_puntos_quien_propone_id_fkey"
            columns: ["quien_propone_id"]
            isOneToOne: false
            referencedRelation: "pareja_usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pareja_puntos_quien_propone_id_fkey"
            columns: ["quien_propone_id"]
            isOneToOne: false
            referencedRelation: "pareja_vista_ranking_pareja"
            referencedColumns: ["usuario_id"]
          },
          {
            foreignKeyName: "pareja_puntos_quien_propone_id_fkey"
            columns: ["quien_propone_id"]
            isOneToOne: false
            referencedRelation: "vista_historial_canjes"
            referencedColumns: ["usuario_id"]
          },
        ]
      }
      pareja_retos_ia: {
        Row: {
          codigo_pareja: string
          fecha: string | null
          id: string
          prompt_generado: string | null
          respuesta_ia: string | null
          tipo: string | null
        }
        Insert: {
          codigo_pareja: string
          fecha?: string | null
          id?: string
          prompt_generado?: string | null
          respuesta_ia?: string | null
          tipo?: string | null
        }
        Update: {
          codigo_pareja?: string
          fecha?: string | null
          id?: string
          prompt_generado?: string | null
          respuesta_ia?: string | null
          tipo?: string | null
        }
        Relationships: []
      }
      pareja_usuarios: {
        Row: {
          codigo_pareja: string | null
          correo: string | null
          id: string
          nombre: string
          pareja_id: string | null
        }
        Insert: {
          codigo_pareja?: string | null
          correo?: string | null
          id?: string
          nombre: string
          pareja_id?: string | null
        }
        Update: {
          codigo_pareja?: string | null
          correo?: string | null
          id?: string
          nombre?: string
          pareja_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pareja_usuarios_pareja_id_fkey"
            columns: ["pareja_id"]
            isOneToOne: false
            referencedRelation: "parea_vista_puntos_disponibles"
            referencedColumns: ["usuario_id"]
          },
          {
            foreignKeyName: "pareja_usuarios_pareja_id_fkey"
            columns: ["pareja_id"]
            isOneToOne: false
            referencedRelation: "pareja_usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pareja_usuarios_pareja_id_fkey"
            columns: ["pareja_id"]
            isOneToOne: false
            referencedRelation: "pareja_vista_ranking_pareja"
            referencedColumns: ["usuario_id"]
          },
          {
            foreignKeyName: "pareja_usuarios_pareja_id_fkey"
            columns: ["pareja_id"]
            isOneToOne: false
            referencedRelation: "vista_historial_canjes"
            referencedColumns: ["usuario_id"]
          },
        ]
      }
      participation_points: {
        Row: {
          created_at: string
          id: string
          points: number
          reason: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          points: number
          reason: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          points?: number
          reason?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "participation_points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "clase_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participation_points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_rankings"
            referencedColumns: ["user_id"]
          },
        ]
      }
      propiedades: {
        Row: {
          descripcion: string | null
          fecha_publicacion: string | null
          id: string
          imagenes: string[] | null
          keywords_ia: string[] | null
          precio: number
          tipo: string | null
          tipo_operacion: string | null
          titulo: string
          ubicacion: string | null
          usuario_id: string | null
        }
        Insert: {
          descripcion?: string | null
          fecha_publicacion?: string | null
          id?: string
          imagenes?: string[] | null
          keywords_ia?: string[] | null
          precio: number
          tipo?: string | null
          tipo_operacion?: string | null
          titulo: string
          ubicacion?: string | null
          usuario_id?: string | null
        }
        Update: {
          descripcion?: string | null
          fecha_publicacion?: string | null
          id?: string
          imagenes?: string[] | null
          keywords_ia?: string[] | null
          precio?: number
          tipo?: string | null
          tipo_operacion?: string | null
          titulo?: string
          ubicacion?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "propiedades_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      propuestas_comerciales: {
        Row: {
          activo: boolean | null
          contenido_html: string | null
          created_at: string | null
          id: string
          precio_desde: number | null
          precio_hasta: number | null
          proyecto_id: string
          tiempo_entrega: string | null
          titulo: string
          updated_at: string | null
        }
        Insert: {
          activo?: boolean | null
          contenido_html?: string | null
          created_at?: string | null
          id?: string
          precio_desde?: number | null
          precio_hasta?: number | null
          proyecto_id: string
          tiempo_entrega?: string | null
          titulo?: string
          updated_at?: string | null
        }
        Update: {
          activo?: boolean | null
          contenido_html?: string | null
          created_at?: string | null
          id?: string
          precio_desde?: number | null
          precio_hasta?: number | null
          proyecto_id?: string
          tiempo_entrega?: string | null
          titulo?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "propuestas_comerciales_proyecto_id_fkey"
            columns: ["proyecto_id"]
            isOneToOne: false
            referencedRelation: "proyectos_clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      propuestas_opciones_presupuesto: {
        Row: {
          activo: boolean
          contenido_html: string
          created_at: string
          id: string
          orden: number
          precio: number | null
          proyecto_id: string
          titulo: string
          updated_at: string
        }
        Insert: {
          activo?: boolean
          contenido_html: string
          created_at?: string
          id?: string
          orden?: number
          precio?: number | null
          proyecto_id: string
          titulo: string
          updated_at?: string
        }
        Update: {
          activo?: boolean
          contenido_html?: string
          created_at?: string
          id?: string
          orden?: number
          precio?: number | null
          proyecto_id?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "propuestas_opciones_presupuesto_proyecto_id_fkey"
            columns: ["proyecto_id"]
            isOneToOne: false
            referencedRelation: "proyectos_clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      proyectos_clientes: {
        Row: {
          creado_en: string | null
          descripcion_corta: string | null
          id: string
          imagenes: string[] | null
          nombre_proyecto: string
          resultados: Json | null
          reto: string | null
          slug_proyecto: string
          solucion: string | null
          tech_stack: string[] | null
          url_proyecto: string | null
        }
        Insert: {
          creado_en?: string | null
          descripcion_corta?: string | null
          id?: string
          imagenes?: string[] | null
          nombre_proyecto: string
          resultados?: Json | null
          reto?: string | null
          slug_proyecto: string
          solucion?: string | null
          tech_stack?: string[] | null
          url_proyecto?: string | null
        }
        Update: {
          creado_en?: string | null
          descripcion_corta?: string | null
          id?: string
          imagenes?: string[] | null
          nombre_proyecto?: string
          resultados?: Json | null
          reto?: string | null
          slug_proyecto?: string
          solucion?: string | null
          tech_stack?: string[] | null
          url_proyecto?: string | null
        }
        Relationships: []
      }
      proyectos_configuraciones: {
        Row: {
          activo: boolean | null
          created_at: string | null
          descripcion: string | null
          etiqueta: string
          id: string
          multiplicador: number | null
          nombre_campo: string
          opciones: Json | null
          orden: number | null
          precio_base: number | null
          proyecto_id: string
          requerido: boolean | null
          tipo_campo: string
        }
        Insert: {
          activo?: boolean | null
          created_at?: string | null
          descripcion?: string | null
          etiqueta: string
          id?: string
          multiplicador?: number | null
          nombre_campo: string
          opciones?: Json | null
          orden?: number | null
          precio_base?: number | null
          proyecto_id: string
          requerido?: boolean | null
          tipo_campo: string
        }
        Update: {
          activo?: boolean | null
          created_at?: string | null
          descripcion?: string | null
          etiqueta?: string
          id?: string
          multiplicador?: number | null
          nombre_campo?: string
          opciones?: Json | null
          orden?: number | null
          precio_base?: number | null
          proyecto_id?: string
          requerido?: boolean | null
          tipo_campo?: string
        }
        Relationships: [
          {
            foreignKeyName: "proyectos_configuraciones_proyecto_id_fkey"
            columns: ["proyecto_id"]
            isOneToOne: false
            referencedRelation: "proyectos_clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      recon_audit: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          run_id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          run_id: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          run_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recon_audit_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "recon_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      recon_matches: {
        Row: {
          bank_txn_ids: string[]
          book_txn_ids: string[]
          confidence: number
          created_at: string
          created_by: string | null
          exception: string | null
          id: string
          notes: string | null
          rule: string
          run_id: string
          status: string | null
        }
        Insert: {
          bank_txn_ids: string[]
          book_txn_ids: string[]
          confidence: number
          created_at?: string
          created_by?: string | null
          exception?: string | null
          id?: string
          notes?: string | null
          rule: string
          run_id: string
          status?: string | null
        }
        Update: {
          bank_txn_ids?: string[]
          book_txn_ids?: string[]
          confidence?: number
          created_at?: string
          created_by?: string | null
          exception?: string | null
          id?: string
          notes?: string | null
          rule?: string
          run_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recon_matches_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "recon_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      recon_rule_presets: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          name: string
          org_id: string
          rules_json: Json
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          org_id: string
          rules_json: Json
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          org_id?: string
          rules_json?: Json
        }
        Relationships: []
      }
      recon_runs: {
        Row: {
          bank_file_path: string
          book_file_path: string
          created_at: string
          id: string
          metadata: Json | null
          org_id: string
          rules_json: Json | null
          status: string
          updated_at: string
        }
        Insert: {
          bank_file_path: string
          book_file_path: string
          created_at?: string
          id?: string
          metadata?: Json | null
          org_id: string
          rules_json?: Json | null
          status?: string
          updated_at?: string
        }
        Update: {
          bank_file_path?: string
          book_file_path?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          org_id?: string
          rules_json?: Json | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      recon_txns: {
        Row: {
          account_code: string | null
          amount: number
          counterparty: string | null
          created_at: string
          currency: string | null
          date: string
          description: string | null
          id: string
          invoice_no: string | null
          meta: Json | null
          raw_ref: string | null
          run_id: string
          source: string
          tax_id: string | null
        }
        Insert: {
          account_code?: string | null
          amount: number
          counterparty?: string | null
          created_at?: string
          currency?: string | null
          date: string
          description?: string | null
          id?: string
          invoice_no?: string | null
          meta?: Json | null
          raw_ref?: string | null
          run_id: string
          source: string
          tax_id?: string | null
        }
        Update: {
          account_code?: string | null
          amount?: number
          counterparty?: string | null
          created_at?: string
          currency?: string | null
          date?: string
          description?: string | null
          id?: string
          invoice_no?: string | null
          meta?: Json | null
          raw_ref?: string | null
          run_id?: string
          source?: string
          tax_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recon_txns_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "recon_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          calificacion: number | null
          comentario: string | null
          fecha: string | null
          id: string
          propiedad_id: string | null
          usuario_id: string | null
        }
        Insert: {
          calificacion?: number | null
          comentario?: string | null
          fecha?: string | null
          id?: string
          propiedad_id?: string | null
          usuario_id?: string | null
        }
        Update: {
          calificacion?: number | null
          comentario?: string | null
          fecha?: string | null
          id?: string
          propiedad_id?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_propiedad_id_fkey"
            columns: ["propiedad_id"]
            isOneToOne: false
            referencedRelation: "propiedades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      te_facilitamos_asignaciones: {
        Row: {
          activo: boolean | null
          contrato_id: string | null
          created_at: string | null
          empleado_id: string | null
          fecha_asignacion: string
          fecha_finalizacion: string | null
          id: string
          observaciones: string | null
          salario_asignado: number | null
          turno: string | null
        }
        Insert: {
          activo?: boolean | null
          contrato_id?: string | null
          created_at?: string | null
          empleado_id?: string | null
          fecha_asignacion: string
          fecha_finalizacion?: string | null
          id?: string
          observaciones?: string | null
          salario_asignado?: number | null
          turno?: string | null
        }
        Update: {
          activo?: boolean | null
          contrato_id?: string | null
          created_at?: string | null
          empleado_id?: string | null
          fecha_asignacion?: string
          fecha_finalizacion?: string | null
          id?: string
          observaciones?: string | null
          salario_asignado?: number | null
          turno?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "te_facilitamos_asignaciones_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "te_facilitamos_contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "te_facilitamos_asignaciones_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "te_facilitamos_empleados"
            referencedColumns: ["id"]
          },
        ]
      }
      te_facilitamos_asistencias: {
        Row: {
          created_at: string | null
          empleado_id: string | null
          estado: string | null
          fecha: string
          hora_entrada: string | null
          hora_salida: string | null
          horas_trabajadas: number | null
          id: string
          observaciones: string | null
          tipo_jornada: string | null
        }
        Insert: {
          created_at?: string | null
          empleado_id?: string | null
          estado?: string | null
          fecha: string
          hora_entrada?: string | null
          hora_salida?: string | null
          horas_trabajadas?: number | null
          id?: string
          observaciones?: string | null
          tipo_jornada?: string | null
        }
        Update: {
          created_at?: string | null
          empleado_id?: string | null
          estado?: string | null
          fecha?: string
          hora_entrada?: string | null
          hora_salida?: string | null
          horas_trabajadas?: number | null
          id?: string
          observaciones?: string | null
          tipo_jornada?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "te_facilitamos_asistencias_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "te_facilitamos_empleados"
            referencedColumns: ["id"]
          },
        ]
      }
      te_facilitamos_capacitacion_participantes: {
        Row: {
          asistio: boolean | null
          calificacion: number | null
          capacitacion_id: string | null
          certificado_emitido: boolean | null
          created_at: string | null
          empleado_id: string | null
          id: string
          observaciones: string | null
        }
        Insert: {
          asistio?: boolean | null
          calificacion?: number | null
          capacitacion_id?: string | null
          certificado_emitido?: boolean | null
          created_at?: string | null
          empleado_id?: string | null
          id?: string
          observaciones?: string | null
        }
        Update: {
          asistio?: boolean | null
          calificacion?: number | null
          capacitacion_id?: string | null
          certificado_emitido?: boolean | null
          created_at?: string | null
          empleado_id?: string | null
          id?: string
          observaciones?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "te_facilitamos_capacitacion_participantes_capacitacion_id_fkey"
            columns: ["capacitacion_id"]
            isOneToOne: false
            referencedRelation: "te_facilitamos_capacitaciones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "te_facilitamos_capacitacion_participantes_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "te_facilitamos_empleados"
            referencedColumns: ["id"]
          },
        ]
      }
      te_facilitamos_capacitaciones: {
        Row: {
          costo: number | null
          created_at: string | null
          descripcion: string | null
          duracion_horas: number | null
          estado: string | null
          fecha_programada: string | null
          id: string
          instructor: string | null
          nombre: string
          observaciones: string | null
          tipo: string | null
        }
        Insert: {
          costo?: number | null
          created_at?: string | null
          descripcion?: string | null
          duracion_horas?: number | null
          estado?: string | null
          fecha_programada?: string | null
          id?: string
          instructor?: string | null
          nombre: string
          observaciones?: string | null
          tipo?: string | null
        }
        Update: {
          costo?: number | null
          created_at?: string | null
          descripcion?: string | null
          duracion_horas?: number | null
          estado?: string | null
          fecha_programada?: string | null
          id?: string
          instructor?: string | null
          nombre?: string
          observaciones?: string | null
          tipo?: string | null
        }
        Relationships: []
      }
      te_facilitamos_contratos: {
        Row: {
          cliente_cedula_ruc: string | null
          cliente_direccion: string | null
          cliente_email: string | null
          cliente_nombre: string
          cliente_telefono: string | null
          created_at: string | null
          descripcion_servicio: string | null
          estado: string | null
          fecha_fin: string | null
          fecha_inicio: string
          id: string
          observaciones: string | null
          tipo_servicio: string
          updated_at: string | null
          valor_mensual: number | null
        }
        Insert: {
          cliente_cedula_ruc?: string | null
          cliente_direccion?: string | null
          cliente_email?: string | null
          cliente_nombre: string
          cliente_telefono?: string | null
          created_at?: string | null
          descripcion_servicio?: string | null
          estado?: string | null
          fecha_fin?: string | null
          fecha_inicio: string
          id?: string
          observaciones?: string | null
          tipo_servicio: string
          updated_at?: string | null
          valor_mensual?: number | null
        }
        Update: {
          cliente_cedula_ruc?: string | null
          cliente_direccion?: string | null
          cliente_email?: string | null
          cliente_nombre?: string
          cliente_telefono?: string | null
          created_at?: string | null
          descripcion_servicio?: string | null
          estado?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string
          id?: string
          observaciones?: string | null
          tipo_servicio?: string
          updated_at?: string | null
          valor_mensual?: number | null
        }
        Relationships: []
      }
      te_facilitamos_empleados: {
        Row: {
          apellidos: string
          cedula: string
          created_at: string | null
          direccion: string | null
          email: string | null
          estado: string | null
          fecha_ingreso: string
          foto_url: string | null
          id: string
          nombre: string
          observaciones: string | null
          salario_base: number | null
          telefono: string | null
          tipo_personal: string
          updated_at: string | null
        }
        Insert: {
          apellidos: string
          cedula: string
          created_at?: string | null
          direccion?: string | null
          email?: string | null
          estado?: string | null
          fecha_ingreso: string
          foto_url?: string | null
          id?: string
          nombre: string
          observaciones?: string | null
          salario_base?: number | null
          telefono?: string | null
          tipo_personal: string
          updated_at?: string | null
        }
        Update: {
          apellidos?: string
          cedula?: string
          created_at?: string | null
          direccion?: string | null
          email?: string | null
          estado?: string | null
          fecha_ingreso?: string
          foto_url?: string | null
          id?: string
          nombre?: string
          observaciones?: string | null
          salario_base?: number | null
          telefono?: string | null
          tipo_personal?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      te_facilitamos_modulos: {
        Row: {
          activo: boolean | null
          created_at: string | null
          descripcion: string | null
          id: string
          nombre: string
          precio_base: number | null
        }
        Insert: {
          activo?: boolean | null
          created_at?: string | null
          descripcion?: string | null
          id?: string
          nombre: string
          precio_base?: number | null
        }
        Update: {
          activo?: boolean | null
          created_at?: string | null
          descripcion?: string | null
          id?: string
          nombre?: string
          precio_base?: number | null
        }
        Relationships: []
      }
      te_facilitamos_planillas: {
        Row: {
          bonificaciones: number | null
          created_at: string | null
          deducciones: number | null
          deducciones_isr: number | null
          deducciones_iss: number | null
          empleado_id: string | null
          estado: string | null
          fecha_pago: string | null
          horas_extras: number | null
          id: string
          observaciones: string | null
          periodo_fin: string
          periodo_inicio: string
          salario_base: number | null
          salario_bruto: number | null
          salario_neto: number | null
          valor_horas_extras: number | null
        }
        Insert: {
          bonificaciones?: number | null
          created_at?: string | null
          deducciones?: number | null
          deducciones_isr?: number | null
          deducciones_iss?: number | null
          empleado_id?: string | null
          estado?: string | null
          fecha_pago?: string | null
          horas_extras?: number | null
          id?: string
          observaciones?: string | null
          periodo_fin: string
          periodo_inicio: string
          salario_base?: number | null
          salario_bruto?: number | null
          salario_neto?: number | null
          valor_horas_extras?: number | null
        }
        Update: {
          bonificaciones?: number | null
          created_at?: string | null
          deducciones?: number | null
          deducciones_isr?: number | null
          deducciones_iss?: number | null
          empleado_id?: string | null
          estado?: string | null
          fecha_pago?: string | null
          horas_extras?: number | null
          id?: string
          observaciones?: string | null
          periodo_fin?: string
          periodo_inicio?: string
          salario_base?: number | null
          salario_bruto?: number | null
          salario_neto?: number | null
          valor_horas_extras?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "te_facilitamos_planillas_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "te_facilitamos_empleados"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          auth_id: string
          correo: string
          foto: string | null
          id: string
          nombre: string
          tipo_usuario: string
        }
        Insert: {
          auth_id: string
          correo: string
          foto?: string | null
          id?: string
          nombre: string
          tipo_usuario: string
        }
        Update: {
          auth_id?: string
          correo?: string
          foto?: string | null
          id?: string
          nombre?: string
          tipo_usuario?: string
        }
        Relationships: []
      }
    }
    Views: {
      parea_vista_historial_puntos: {
        Row: {
          cantidad: number | null
          codigo_pareja: string | null
          comentario_respuesta: string | null
          estado: string | null
          fecha_creacion: string | null
          motivo: string | null
          para_quien: string | null
          para_quien_id: string | null
          punto_id: string | null
          quien_propone: string | null
          quien_propone_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pareja_puntos_para_quien_id_fkey"
            columns: ["para_quien_id"]
            isOneToOne: false
            referencedRelation: "parea_vista_puntos_disponibles"
            referencedColumns: ["usuario_id"]
          },
          {
            foreignKeyName: "pareja_puntos_para_quien_id_fkey"
            columns: ["para_quien_id"]
            isOneToOne: false
            referencedRelation: "pareja_usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pareja_puntos_para_quien_id_fkey"
            columns: ["para_quien_id"]
            isOneToOne: false
            referencedRelation: "pareja_vista_ranking_pareja"
            referencedColumns: ["usuario_id"]
          },
          {
            foreignKeyName: "pareja_puntos_para_quien_id_fkey"
            columns: ["para_quien_id"]
            isOneToOne: false
            referencedRelation: "vista_historial_canjes"
            referencedColumns: ["usuario_id"]
          },
          {
            foreignKeyName: "pareja_puntos_quien_propone_id_fkey"
            columns: ["quien_propone_id"]
            isOneToOne: false
            referencedRelation: "parea_vista_puntos_disponibles"
            referencedColumns: ["usuario_id"]
          },
          {
            foreignKeyName: "pareja_puntos_quien_propone_id_fkey"
            columns: ["quien_propone_id"]
            isOneToOne: false
            referencedRelation: "pareja_usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pareja_puntos_quien_propone_id_fkey"
            columns: ["quien_propone_id"]
            isOneToOne: false
            referencedRelation: "pareja_vista_ranking_pareja"
            referencedColumns: ["usuario_id"]
          },
          {
            foreignKeyName: "pareja_puntos_quien_propone_id_fkey"
            columns: ["quien_propone_id"]
            isOneToOne: false
            referencedRelation: "vista_historial_canjes"
            referencedColumns: ["usuario_id"]
          },
        ]
      }
      parea_vista_puntos_disponibles: {
        Row: {
          codigo_pareja: string | null
          nombre: string | null
          puntos_acumulados: number | null
          puntos_disponibles: number | null
          puntos_usados: number | null
          usuario_id: string | null
        }
        Insert: {
          codigo_pareja?: string | null
          nombre?: string | null
          puntos_acumulados?: never
          puntos_disponibles?: never
          puntos_usados?: never
          usuario_id?: string | null
        }
        Update: {
          codigo_pareja?: string | null
          nombre?: string | null
          puntos_acumulados?: never
          puntos_disponibles?: never
          puntos_usados?: never
          usuario_id?: string | null
        }
        Relationships: []
      }
      pareja_vista_ranking_pareja: {
        Row: {
          codigo_pareja: string | null
          nombre: string | null
          puntos_acumulados: number | null
          puntos_disponibles: number | null
          puntos_usados: number | null
          usuario_id: string | null
        }
        Insert: {
          codigo_pareja?: string | null
          nombre?: string | null
          puntos_acumulados?: never
          puntos_disponibles?: never
          puntos_usados?: never
          usuario_id?: string | null
        }
        Update: {
          codigo_pareja?: string | null
          nombre?: string | null
          puntos_acumulados?: never
          puntos_disponibles?: never
          puntos_usados?: never
          usuario_id?: string | null
        }
        Relationships: []
      }
      user_rankings: {
        Row: {
          name: string | null
          rank: number | null
          total_points: number | null
          user_id: string | null
        }
        Relationships: []
      }
      vista_historial_canjes: {
        Row: {
          canje_id: string | null
          codigo_pareja: string | null
          costo_puntos: number | null
          estado: string | null
          fecha: string | null
          nombre: string | null
          premio: string | null
          usuario_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      get_user_total_points: {
        Args: { user_id: string }
        Returns: number
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      match_documents: {
        Args: { filter: Json; match_count: number; query_embedding: string }
        Returns: {
          content: string
          doc_id: string
          embedding: string
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
